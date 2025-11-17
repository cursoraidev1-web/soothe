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
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Pages')
@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('pages')
  @Public()
  @ApiOperation({ summary: 'Get all published pages (Public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Pages retrieved successfully' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.pagesService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      publishedOnly: true,
    });
  }

  @Get('pages/:slug')
  @Public()
  @ApiOperation({ summary: 'Get page by slug (Public)' })
  @ApiResponse({ status: 200, description: 'Page retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Post('admin/pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new page (Admin/Editor)' })
  @ApiResponse({ status: 201, description: 'Page created successfully' })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update page (Admin/Editor)' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete page (Admin only)' })
  @ApiResponse({ status: 200, description: 'Page deleted successfully' })
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
