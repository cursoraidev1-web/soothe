import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.solutionCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { solutions: true },
        },
      },
    });

    return categories;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.slug || slugify(createCategoryDto.name, { lower: true });

    const existingCategory = await this.prisma.solutionCategory.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this slug already exists');
    }

    const category = await this.prisma.solutionCategory.create({
      data: {
        ...createCategoryDto,
        slug,
      },
    });

    this.logger.log(`Solution category created: ${slug}`);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.solutionCategory.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const updatedCategory = await this.prisma.solutionCategory.update({
      where: { id },
      data: updateCategoryDto,
    });

    this.logger.log(`Solution category updated: ${id}`);
    return updatedCategory;
  }

  async remove(id: string) {
    const category = await this.prisma.solutionCategory.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.solutionCategory.delete({ where: { id } });

    this.logger.log(`Solution category deleted: ${id}`);
    return { message: 'Category deleted successfully' };
  }
}
