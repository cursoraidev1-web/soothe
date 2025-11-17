import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR)
  @ApiOperation({ summary: 'Get all media files (Admin/Editor/Author)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'mimeType', required: false, type: String })
  @ApiQuery({ name: 'folder', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Media files retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('mimeType') mimeType?: string,
    @Query('folder') folder?: string,
  ) {
    return this.mediaService.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      mimeType,
      folder,
    });
  }

  @Post('upload')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR, UserRole.AUTHOR)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload media file (Admin/Editor/Author)' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file or missing alt text' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadMediaDto: UploadMediaDto,
  ) {
    return this.mediaService.upload(file, uploadMediaDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete media file (Admin only)' })
  @ApiResponse({ status: 200, description: 'Media file deleted successfully' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
