import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import slugify from 'slugify';

@Injectable()
export class SolutionsService {
  private readonly logger = new Logger(SolutionsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page: number;
    limit: number;
    publishedOnly: boolean;
    categoryId?: string;
  }) {
    const { page, limit, publishedOnly, categoryId } = params;
    const skip = (page - 1) * limit;

    const where: any = publishedOnly ? { isPublished: true } : {};
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [solutions, total] = await Promise.all([
      this.prisma.solution.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.solution.count({ where }),
    ]);

    return {
      data: solutions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const solution = await this.prisma.solution.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!solution || !solution.isPublished) {
      throw new NotFoundException('Solution not found');
    }

    return solution;
  }

  async create(createSolutionDto: CreateSolutionDto) {
    const slug = createSolutionDto.slug || slugify(createSolutionDto.title, { lower: true });

    const existingSolution = await this.prisma.solution.findUnique({
      where: { slug },
    });

    if (existingSolution) {
      throw new ConflictException('Solution with this slug already exists');
    }

    const solution = await this.prisma.solution.create({
      data: {
        ...createSolutionDto,
        slug,
        publishedAt: createSolutionDto.isPublished ? new Date() : null,
      },
      include: {
        category: true,
      },
    });

    this.logger.log(`Solution created: ${slug}`);
    return solution;
  }

  async update(id: string, updateSolutionDto: UpdateSolutionDto) {
    const solution = await this.prisma.solution.findUnique({ where: { id } });

    if (!solution) {
      throw new NotFoundException('Solution not found');
    }

    const data: any = { ...updateSolutionDto };

    if (updateSolutionDto.isPublished && !solution.publishedAt) {
      data.publishedAt = new Date();
    } else if (updateSolutionDto.isPublished === false) {
      data.publishedAt = null;
    }

    const updatedSolution = await this.prisma.solution.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });

    this.logger.log(`Solution updated: ${id}`);
    return updatedSolution;
  }

  async remove(id: string) {
    const solution = await this.prisma.solution.findUnique({ where: { id } });

    if (!solution) {
      throw new NotFoundException('Solution not found');
    }

    await this.prisma.solution.delete({ where: { id } });

    this.logger.log(`Solution deleted: ${id}`);
    return { message: 'Solution deleted successfully' };
  }
}
