import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Applicants')
@Controller()
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post('careers/:careerId/apply')
  @Public()
  @UseInterceptors(FileInterceptor('cv'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Apply for a job (Public)' })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  async apply(
    @Param('careerId') careerId: string,
    @Body() createApplicantDto: CreateApplicantDto,
    @UploadedFile() cv: Express.Multer.File,
  ) {
    return this.applicantsService.create(careerId, createApplicantDto, cv);
  }

  @Get('admin/applicants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all applicants (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'careerId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Applicants retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('careerId') careerId?: string,
    @Query('status') status?: string,
  ) {
    return this.applicantsService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      careerId,
      status,
    });
  }

  @Get('admin/applicants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get applicant by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Applicant retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.applicantsService.findOne(id);
  }

  @Delete('admin/applicants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete applicant (Admin only)' })
  @ApiResponse({ status: 200, description: 'Applicant deleted successfully' })
  remove(@Param('id') id: string) {
    return this.applicantsService.remove(id);
  }
}
