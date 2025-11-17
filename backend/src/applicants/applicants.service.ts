import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ApplicantsService {
  private readonly logger = new Logger(ApplicantsService.name);
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads/cvs';

  constructor(private prisma: PrismaService) {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async create(careerId: string, createApplicantDto: CreateApplicantDto, cv?: Express.Multer.File) {
    // Verify career exists
    const career = await this.prisma.career.findUnique({ where: { id: careerId } });
    if (!career) {
      throw new NotFoundException('Career not found');
    }

    // Handle CV upload
    let cvUrl = '';
    if (cv) {
      const fileName = `${Date.now()}-${cv.originalname}`;
      const filePath = path.join(this.uploadPath, fileName);
      fs.writeFileSync(filePath, cv.buffer);
      cvUrl = `/uploads/cvs/${fileName}`;
    } else {
      throw new BadRequestException('CV file is required');
    }

    const applicant = await this.prisma.applicant.create({
      data: {
        ...createApplicantDto,
        careerId,
        cvUrl,
      },
      include: {
        career: true,
      },
    });

    this.logger.log(`New application received for ${career.title}`);
    return applicant;
  }

  async findAll(params: {
    page: number;
    limit: number;
    careerId?: string;
    status?: string;
  }) {
    const { page, limit, careerId, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (careerId) where.careerId = careerId;
    if (status) where.status = status;

    const [applicants, total] = await Promise.all([
      this.prisma.applicant.findMany({
        where,
        skip,
        take: limit,
        include: {
          career: {
            select: {
              id: true,
              title: true,
              department: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.applicant.count({ where }),
    ]);

    return {
      data: applicants,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const applicant = await this.prisma.applicant.findUnique({
      where: { id },
      include: {
        career: true,
      },
    });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    return applicant;
  }

  async remove(id: string) {
    const applicant = await this.prisma.applicant.findUnique({ where: { id } });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    // Delete CV file if exists
    if (applicant.cvUrl) {
      const filePath = path.join(process.cwd(), applicant.cvUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.prisma.applicant.delete({ where: { id } });

    this.logger.log(`Applicant deleted: ${id}`);
    return { message: 'Applicant deleted successfully' };
  }
}
