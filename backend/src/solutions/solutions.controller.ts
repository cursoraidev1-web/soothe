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
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Solutions')
@Controller()
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get('solutions')
  @Public()
  @ApiOperation({ summary: 'Get all published solutions (Public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Solutions retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.solutionsService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      publishedOnly: true,
      categoryId,
    });
  }

  @Get('solutions/:slug')
  @Public()
  @ApiOperation({ summary: 'Get solution by slug (Public)' })
  @ApiResponse({ status: 200, description: 'Solution retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Solution not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.solutionsService.findBySlug(slug);
  }

  @Post('admin/solutions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new solution (Admin/Editor)' })
  @ApiResponse({ status: 201, description: 'Solution created successfully' })
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }

  @Put('admin/solutions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update solution (Admin/Editor)' })
  @ApiResponse({ status: 200, description: 'Solution updated successfully' })
  update(@Param('id') id: string, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionsService.update(id, updateSolutionDto);
  }

  @Delete('admin/solutions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete solution (Admin only)' })
  @ApiResponse({ status: 200, description: 'Solution deleted successfully' })
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(id);
  }
}
