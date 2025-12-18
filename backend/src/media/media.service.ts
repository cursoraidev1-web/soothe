import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly uploadDir: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    // Set upload directory (works on Render with persistent disk)
    this.uploadDir = path.join(process.cwd(), 'uploads', 'media');
    
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async findAll(params: {
    page: number;
    limit: number;
    mimeType?: string;
    folder?: string;
  }) {
    const { page, limit, mimeType, folder } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (mimeType) where.mimeType = { contains: mimeType };
    if (folder) where.folder = folder;

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      data: media,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async upload(file: Express.Multer.File, uploadMediaDto: UploadMediaDto) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Check if image requires alt text
    const isImage = file.mimetype.startsWith('image/');
    if (isImage && !uploadMediaDto.altText) {
      throw new BadRequestException('Alt text is required for images (accessibility)');
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    const name = file.originalname.substring(0, file.originalname.lastIndexOf('.')).replace(/[^a-zA-Z0-9]/g, '-');
    const fileName = `${name}-${uniqueSuffix}${ext}`;
    const folder = uploadMediaDto.folder || '/';
    
    // Create folder directory if it doesn't exist
    const folderPath = path.join(this.uploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    let width: number | undefined;
    let height: number | undefined;

    // Get image dimensions if it's an image
    if (isImage && file.buffer) {
      try {
        const metadata = await sharp(file.buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch (error) {
        this.logger.warn('Failed to get image metadata', error);
      }
    }

    // Save file to local filesystem
    const filePath = path.join(folderPath, fileName);
    try {
      fs.writeFileSync(filePath, file.buffer);
      this.logger.log(`File saved to local filesystem: ${filePath}`);
    } catch (error) {
      this.logger.error('Failed to save file', error);
      throw new BadRequestException('Failed to upload file');
    }

    // Generate URL (relative path for serving static files)
    const url = `/uploads/media${folder}${fileName}`;

    const media = await this.prisma.media.create({
      data: {
        fileName: fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
        altText: uploadMediaDto.altText,
        title: uploadMediaDto.title,
        description: uploadMediaDto.description,
        folder: folder,
        width,
        height,
      },
    });

    this.logger.log(`Media file uploaded: ${file.originalname}`);
    return media;
  }

  async remove(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });

    if (!media) {
      throw new NotFoundException('Media file not found');
    }

    // Delete file from local filesystem
    // Extract file path from URL (format: /uploads/media/folder/filename)
    let filePath = '';
    if (media.url.startsWith('/uploads/')) {
      filePath = path.join(process.cwd(), media.url);
    } else {
      // Fallback: construct path from folder and filename
      filePath = path.join(this.uploadDir, media.folder || '/', media.fileName);
    }

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        this.logger.log(`File deleted from local filesystem: ${filePath}`);
      } catch (error) {
        this.logger.warn('Failed to delete file from filesystem', error);
        // Continue with database deletion even if file deletion fails
      }
    }

    await this.prisma.media.delete({ where: { id } });

    this.logger.log(`Media file deleted: ${id}`);
    return { message: 'Media file deleted successfully' };
  }
}
