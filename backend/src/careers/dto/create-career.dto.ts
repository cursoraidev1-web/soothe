import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, IsArray } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class CreateCareerDto {
  @ApiProperty({ example: 'Senior Software Engineer' })
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Engineering' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false, example: 'Remote' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false, example: 'Full-time' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: 'We are looking for a senior software engineer...' })
  @IsString()
  description: string;

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

  @ApiProperty({ enum: JobStatus, default: JobStatus.OPEN })
  @IsEnum(JobStatus)
  status: JobStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  salaryMin?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  salaryMax?: number;

  @ApiProperty({ required: false, default: 'USD' })
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
