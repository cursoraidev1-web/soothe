import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole, JobStatus } from '@prisma/client';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all open positions (Public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'department', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Careers retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('department') department?: string,
    @Query('type') type?: string,
  ) {
    return this.careersService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      status: JobStatus.OPEN,
      department,
      type,
    });
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get career by ID (Public)' })
  @ApiResponse({ status: 200, description: 'Career retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Career not found' })
  findOne(@Param('id') id: string) {
    return this.careersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new job posting (Admin only)' })
  @ApiResponse({ status: 201, description: 'Career created successfully' })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careersService.create(createCareerDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update job posting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Career updated successfully' })
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careersService.update(id, updateCareerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete job posting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Career deleted successfully' })
  remove(@Param('id') id: string) {
    return this.careersService.remove(id);
  }
}
