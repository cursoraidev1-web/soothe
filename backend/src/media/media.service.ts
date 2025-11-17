import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(private prisma: PrismaService) {}

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
      // Delete uploaded file
      fs.unlinkSync(file.path);
      throw new BadRequestException('Alt text is required for images (accessibility)');
    }

    let width: number | undefined;
    let height: number | undefined;

    // Get image dimensions if it's an image
    if (isImage) {
      try {
        const metadata = await sharp(file.path).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch (error) {
        this.logger.warn('Failed to get image metadata', error);
      }
    }

    const url = `/uploads/media/${file.filename}`;

    const media = await this.prisma.media.create({
      data: {
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
        altText: uploadMediaDto.altText,
        title: uploadMediaDto.title,
        description: uploadMediaDto.description,
        folder: uploadMediaDto.folder || '/',
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

    // Delete physical file
    const filePath = path.join(process.cwd(), media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.prisma.media.delete({ where: { id } });

    this.logger.log(`Media file deleted: ${id}`);
    return { message: 'Media file deleted successfully' };
  }
}
