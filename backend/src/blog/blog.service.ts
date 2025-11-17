import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import slugify from 'slugify';
import { PostStatus } from '@prisma/client';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page: number;
    limit: number;
    publishedOnly: boolean;
    tag?: string;
    search?: string;
  }) {
    const { page, limit, publishedOnly, tag, search } = params;
    const skip = (page - 1) * limit;

    const where: any = publishedOnly ? { status: PostStatus.PUBLISHED } : {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Note: Tag filtering on JSON array would need raw query or different approach
    // For simplicity, we'll filter after query if tag is provided

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    let filteredPosts = posts;
    if (tag) {
      filteredPosts = posts.filter((post) => {
        const tags = post.tags as string[];
        return tags && tags.includes(tag);
      });
    }

    return {
      data: filteredPosts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!post || post.status !== PostStatus.PUBLISHED) {
      throw new NotFoundException('Blog post not found');
    }

    // Increment view count
    await this.prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    return post;
  }

  async create(createBlogPostDto: CreateBlogPostDto, authorId: string) {
    const slug = createBlogPostDto.slug || slugify(createBlogPostDto.title, { lower: true });

    const existingPost = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      throw new ConflictException('Blog post with this slug already exists');
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const readingTime = this.calculateReadingTime(createBlogPostDto.content);

    const post = await this.prisma.blogPost.create({
      data: {
        ...createBlogPostDto,
        slug,
        authorId,
        readingTime,
        publishedAt:
          createBlogPostDto.status === PostStatus.PUBLISHED ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    this.logger.log(`Blog post created: ${slug}`);
    return post;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    const data: any = { ...updateBlogPostDto };

    if (updateBlogPostDto.content) {
      data.readingTime = this.calculateReadingTime(updateBlogPostDto.content);
    }

    if (updateBlogPostDto.status === PostStatus.PUBLISHED && !post.publishedAt) {
      data.publishedAt = new Date();
    } else if (updateBlogPostDto.status === PostStatus.DRAFT) {
      data.publishedAt = null;
    }

    const updatedPost = await this.prisma.blogPost.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    this.logger.log(`Blog post updated: ${id}`);
    return updatedPost;
  }

  async remove(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    await this.prisma.blogPost.delete({ where: { id } });

    this.logger.log(`Blog post deleted: ${id}`);
    return { message: 'Blog post deleted successfully' };
  }

  private calculateReadingTime(content: any): number {
    // Simple word count estimation
    const text = JSON.stringify(content);
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / 200); // 200 words per minute
  }
}
