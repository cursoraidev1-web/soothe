import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateApplicantDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: 'I am excited to apply...' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ required: false, example: 'https://linkedin.com/in/johndoe' })
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'CV file' })
  cv?: any;
}
