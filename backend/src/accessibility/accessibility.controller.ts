import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessibilityService } from './accessibility.service';
import { UpdateAccessibilityDto } from './dto/update-accessibility.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Accessibility')
@Controller('accessibility')
export class AccessibilityController {
  constructor(private readonly accessibilityService: AccessibilityService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get accessibility configuration (Public)' })
  @ApiResponse({ status: 200, description: 'Accessibility configuration retrieved' })
  getAccessibility() {
    return this.accessibilityService.getAccessibility();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update accessibility configuration (Admin only)' })
  @ApiResponse({ status: 200, description: 'Accessibility configuration updated' })
  updateAccessibility(@Body() updateAccessibilityDto: UpdateAccessibilityDto) {
    return this.accessibilityService.updateAccessibility(updateAccessibilityDto);
  }
}
