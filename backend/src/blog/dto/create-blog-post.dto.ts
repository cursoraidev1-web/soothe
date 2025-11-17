import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsObject, IsArray } from 'class-validator';
import { PostStatus } from '@prisma/client';

export class CreateBlogPostDto {
  @ApiProperty({ example: 'The Future of Cloud Computing' })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ description: 'Rich content as JSON' })
  @IsObject()
  content: any;

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

  @ApiProperty({ enum: PostStatus, default: PostStatus.DRAFT })
  @IsEnum(PostStatus)
  status: PostStatus;
}
