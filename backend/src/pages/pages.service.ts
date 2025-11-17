import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import slugify from 'slugify';

@Injectable()
export class PagesService {
  private readonly logger = new Logger(PagesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(params: { page: number; limit: number; publishedOnly: boolean }) {
    const { page, limit, publishedOnly } = params;
    const skip = (page - 1) * limit;

    const where = publishedOnly ? { isPublished: true } : {};

    const [pages, total] = await Promise.all([
      this.prisma.page.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.page.count({ where }),
    ]);

    return {
      data: pages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
    });

    if (!page || !page.isPublished) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async create(createPageDto: CreatePageDto) {
    const slug = createPageDto.slug || slugify(createPageDto.title, { lower: true });

    // Check if slug exists
    const existingPage = await this.prisma.page.findUnique({
      where: { slug },
    });

    if (existingPage) {
      throw new ConflictException('Page with this slug already exists');
    }

    const page = await this.prisma.page.create({
      data: {
        ...createPageDto,
        slug,
        publishedAt: createPageDto.isPublished ? new Date() : null,
      },
    });

    this.logger.log(`Page created: ${slug}`);
    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    const data: any = { ...updatePageDto };

    if (updatePageDto.isPublished && !page.publishedAt) {
      data.publishedAt = new Date();
    } else if (updatePageDto.isPublished === false) {
      data.publishedAt = null;
    }

    const updatedPage = await this.prisma.page.update({
      where: { id },
      data,
    });

    this.logger.log(`Page updated: ${id}`);
    return updatedPage;
  }

  async remove(id: string) {
    const page = await this.prisma.page.findUnique({ where: { id } });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    await this.prisma.page.delete({ where: { id } });

    this.logger.log(`Page deleted: ${id}`);
    return { message: 'Page deleted successfully' };
  }
}
