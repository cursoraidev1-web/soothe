import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsObject, IsDateString } from 'class-validator';

export class UpdateAccessibilityDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  statement?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  wcagLevel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  guidelines?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  keyboardNavigation?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  screenReaderSupport?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  highContrastMode?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  textResizing?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  altTextRequired?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  lastAuditDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  nextAuditDate?: string;
}
