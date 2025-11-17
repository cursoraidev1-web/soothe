import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { MailService } from './mail.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createContactSubmissionDto: CreateContactSubmissionDto) {
    const submission = await this.prisma.contactSubmission.create({
      data: createContactSubmissionDto,
    });

    // Send notification email to admin
    try {
      await this.mailService.sendContactNotification(submission);
    } catch (error) {
      this.logger.error('Failed to send email notification', error);
    }

    this.logger.log(`New contact submission from ${submission.email}`);
    
    return {
      message: 'Contact submission received successfully',
      id: submission.id,
    };
  }

  async findAll(params: {
    page: number;
    limit: number;
    isRead?: boolean;
  }) {
    const { page, limit, isRead } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    const [submissions, total] = await Promise.all([
      this.prisma.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactSubmission.count({ where }),
    ]);

    return {
      data: submissions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: string) {
    const submission = await this.prisma.contactSubmission.findUnique({ where: { id } });

    if (!submission) {
      throw new NotFoundException('Contact submission not found');
    }

    await this.prisma.contactSubmission.delete({ where: { id } });

    this.logger.log(`Contact submission deleted: ${id}`);
    return { message: 'Contact submission deleted successfully' };
  }
}
