import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import * as sharp from 'sharp';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly s3Client: S3Client;
  private readonly s3Bucket: string;
  private readonly awsRegion: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.awsRegion = this.configService.get('AWS_REGION', 'us-east-1');
    this.s3Bucket = this.configService.get('S3_BUCKET', '');
    
    this.s3Client = new S3Client({
      region: this.awsRegion,
    });
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
    const s3Key = `media${folder}${fileName}`;

    let width: number | undefined;
    let height: number | undefined;

    // Get image dimensions if it's an image (from buffer, not disk)
    if (isImage && file.buffer) {
      try {
        const metadata = await sharp(file.buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch (error) {
        this.logger.warn('Failed to get image metadata', error);
      }
    }

    // Upload to S3
    // For local development without S3, you can skip S3 upload
    // and use local file storage (not recommended for production)
    if (!this.s3Bucket) {
      this.logger.warn('S3 bucket not configured - file upload will fail');
      throw new BadRequestException('S3 bucket not configured. Please set S3_BUCKET environment variable.');
    }

    try {
      const uploadCommand = new PutObjectCommand({
        Bucket: this.s3Bucket,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // Make files publicly accessible
      });

      await this.s3Client.send(uploadCommand);
      this.logger.log(`File uploaded to S3: ${s3Key}`);
    } catch (error) {
      this.logger.error('Failed to upload file to S3', error);
      throw new BadRequestException('Failed to upload file');
    }

    // Generate S3 URL
    const url = `https://${this.s3Bucket}.s3.${this.awsRegion}.amazonaws.com/${s3Key}`;

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

    // Extract S3 key from URL
    // URL format: https://bucket.s3.region.amazonaws.com/media/folder/filename
    let s3Key = '';
    try {
      const url = new URL(media.url);
      // Remove leading slash and get path after domain
      s3Key = url.pathname.substring(1);
    } catch (error) {
      // Fallback: if URL parsing fails, try to extract from path
      // Old format: /uploads/media/filename -> media/filename
      if (media.url.startsWith('/uploads/')) {
        s3Key = media.url.replace('/uploads/', '');
      } else if (media.url.includes('amazonaws.com/')) {
        const parts = media.url.split('amazonaws.com/');
        s3Key = parts[1] || '';
      } else {
        // Use folder and filename to reconstruct key
        s3Key = `${media.folder}${media.fileName}`.replace(/^\//, '');
      }
    }

    // Delete from S3
    if (this.s3Bucket && s3Key) {
      try {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: this.s3Bucket,
          Key: s3Key,
        });

        await this.s3Client.send(deleteCommand);
        this.logger.log(`File deleted from S3: ${s3Key}`);
      } catch (error) {
        this.logger.warn('Failed to delete file from S3', error);
        // Continue with database deletion even if S3 deletion fails
      }
    }

    await this.prisma.media.delete({ where: { id } });

    this.logger.log(`Media file deleted: ${id}`);
    return { message: 'Media file deleted successfully' };
  }
}
