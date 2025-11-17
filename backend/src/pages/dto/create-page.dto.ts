import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ example: 'About Us' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'about-us', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false, description: 'Page content as JSON blocks' })
  @IsOptional()
  @IsObject()
  content?: any;

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

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
