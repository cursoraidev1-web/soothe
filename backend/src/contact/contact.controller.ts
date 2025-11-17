import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Contact')
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  @Public()
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ summary: 'Submit contact form (Public)' })
  @ApiResponse({ status: 201, description: 'Contact submission created successfully' })
  create(@Body() createContactSubmissionDto: CreateContactSubmissionDto) {
    return this.contactService.create(createContactSubmissionDto);
  }

  @Get('admin/contact-submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all contact submissions (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Contact submissions retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('isRead') isRead?: string,
  ) {
    return this.contactService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
    });
  }

  @Delete('admin/contact-submissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete contact submission (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact submission deleted successfully' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
