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
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Blog')
@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blog')
  @Public()
  @ApiOperation({ summary: 'Get all published blog posts (Public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Blog posts retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('tag') tag?: string,
    @Query('search') search?: string,
  ) {
    return this.blogService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      publishedOnly: true,
      tag,
      search,
    });
  }

  @Get('blog/:slug')
  @Public()
  @ApiOperation({ summary: 'Get blog post by slug (Public)' })
  @ApiResponse({ status: 200, description: 'Blog post retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Post('admin/blog')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new blog post (Admin/Editor/Author)' })
  @ApiResponse({ status: 201, description: 'Blog post created successfully' })
  create(@Body() createBlogPostDto: CreateBlogPostDto, @GetUser('id') userId: string) {
    return this.blogService.create(createBlogPostDto, userId);
  }

  @Put('admin/blog/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update blog post (Admin/Editor/Author)' })
  @ApiResponse({ status: 200, description: 'Blog post updated successfully' })
  update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogService.update(id, updateBlogPostDto);
  }

  @Delete('admin/blog/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete blog post (Admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
