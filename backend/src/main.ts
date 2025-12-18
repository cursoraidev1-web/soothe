import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Get config service
  const configService = app.get(ConfigService);
  
  // Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // Security
  app.use(helmet());
  
  // Serve static files from uploads directory
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });
  
  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', 'http://localhost:3000').split(','),
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
  
  // Swagger Documentation
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
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Users', 'User management')
    .addTag('Settings', 'Site settings management')
    .addTag('Pages', 'Dynamic page management')
    .addTag('Solutions', 'Solutions and categories')
    .addTag('Accessibility', 'Accessibility features')
    .addTag('Blog', 'Blog posts management')
    .addTag('Careers', 'Job listings')
    .addTag('Applicants', 'Job applications')
    .addTag('Team', 'Team members management')
    .addTag('Contact', 'Contact form submissions')
    .addTag('Media', 'Media library and file uploads')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  console.log(`\n🚀 SOOTHE CMS Backend is running!`);
  console.log(`📍 Server: http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
  console.log(`🔒 Environment: ${configService.get('NODE_ENV', 'development')}`);
}

bootstrap();
