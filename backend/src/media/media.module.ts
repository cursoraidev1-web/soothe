import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// Ensure uploads directory exists
const uploadPath = './uploads/media';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          cb(null, `${name}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB default
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'application/pdf',
          'video/mp4',
        ];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
