import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

// Modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PagesModule } from './pages/pages.module';
import { SolutionsModule } from './solutions/solutions.module';
import { AccessibilityModule } from './accessibility/accessibility.module';
import { BlogModule } from './blog/blog.module';
import { CareersModule } from './careers/careers.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { TeamModule } from './team/team.module';
import { ContactModule } from './contact/contact.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
      limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
    }]),
    
    // Logging
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    
    // Application Modules
    PrismaModule,
    AuthModule,
    UsersModule,
    SettingsModule,
    PagesModule,
    SolutionsModule,
    AccessibilityModule,
    BlogModule,
    CareersModule,
    ApplicantsModule,
    TeamModule,
    ContactModule,
    MediaModule,
  ],
})
export class AppModule {}
