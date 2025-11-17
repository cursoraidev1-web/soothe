import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsUrl } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  siteUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  faviconUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultMetaTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultMetaDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  defaultOgImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  accessibilityEnabled?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  defaultFontSize?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultContrast?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  facebookUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contactPhone?: string;
}
