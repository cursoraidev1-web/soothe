import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import serverlessExpress from '@codegenie/serverless-express';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  const configService = app.get(ConfigService);
  
  // Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // Security
  app.use(helmet());
  
  // CORS - Allow all origins in Lambda (configure via CORS_ORIGIN env var)
  const corsOrigins = configService.get('CORS_ORIGIN', '*').split(',');
  app.enableCors({
    origin: corsOrigins.includes('*') ? true : corsOrigins,
    credentials: true,
  });
  
  // Global prefix
  app.setGlobalPrefix('api/v1');
  
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation (optional in Lambda - can be disabled for production)
  // Uncomment if you want Swagger docs in Lambda
  /*
  const config = new DocumentBuilder()
    .setTitle('SOOTHE CMS Backend API')
    .setDescription('Production-ready Backend CMS API for SOOTHE TECHNOLOGIES LIMITED')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  */

  await app.init();
  cachedApp = serverlessExpress({ app: expressApp });
  return cachedApp;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  // Disable Lambda timeout warning
  context.callbackWaitsForEmptyEventLoop = false;
  
  const app = await bootstrap();
  return app(event, context);
};

