import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, IsArray } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class UpdateCareerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  responsibilities?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  requirements?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  benefits?: string[];

  @ApiProperty({ enum: JobStatus, required: false })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  salaryMin?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  salaryMax?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  salaryCurrency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string;
}
