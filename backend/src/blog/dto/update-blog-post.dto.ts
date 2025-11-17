import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsObject, IsArray } from 'class-validator';
import { PostStatus } from '@prisma/client';

export class UpdateBlogPostDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  content?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  featuredImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ogImage?: string;

  @ApiProperty({ enum: PostStatus, required: false })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
