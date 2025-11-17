import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { JobStatus } from '@prisma/client';

@Injectable()
export class CareersService {
  private readonly logger = new Logger(CareersService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page: number;
    limit: number;
    status?: JobStatus;
    department?: string;
    type?: string;
  }) {
    const { page, limit, status, department, type } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (department) where.department = { contains: department, mode: 'insensitive' };
    if (type) where.type = { contains: type, mode: 'insensitive' };

    const [careers, total] = await Promise.all([
      this.prisma.career.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.career.count({ where }),
    ]);

    return {
      data: careers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const career = await this.prisma.career.findUnique({
      where: { id },
    });

    if (!career) {
      throw new NotFoundException('Career not found');
    }

    return career;
  }

  async create(createCareerDto: CreateCareerDto) {
    const career = await this.prisma.career.create({
      data: createCareerDto,
    });

    this.logger.log(`Career created: ${career.title}`);
    return career;
  }

  async update(id: string, updateCareerDto: UpdateCareerDto) {
    const career = await this.prisma.career.findUnique({ where: { id } });

    if (!career) {
      throw new NotFoundException('Career not found');
    }

    const updatedCareer = await this.prisma.career.update({
      where: { id },
      data: updateCareerDto,
    });

    this.logger.log(`Career updated: ${id}`);
    return updatedCareer;
  }

  async remove(id: string) {
    const career = await this.prisma.career.findUnique({ where: { id } });

    if (!career) {
      throw new NotFoundException('Career not found');
    }

    await this.prisma.career.delete({ where: { id } });

    this.logger.log(`Career deleted: ${id}`);
    return { message: 'Career deleted successfully' };
  }
}
