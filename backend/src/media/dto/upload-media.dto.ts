import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UploadMediaDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ 
    example: 'A person working on a laptop', 
    description: 'Alt text for accessibility (required for images)' 
  })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiProperty({ required: false, example: 'Office workspace' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: 'Modern office environment' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, default: '/' })
  @IsOptional()
  @IsString()
  folder?: string;
}
