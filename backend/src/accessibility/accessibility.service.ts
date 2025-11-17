import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAccessibilityDto } from './dto/update-accessibility.dto';

@Injectable()
export class AccessibilityService {
  private readonly logger = new Logger(AccessibilityService.name);

  constructor(private prisma: PrismaService) {}

  async getAccessibility() {
    let accessibility = await this.prisma.accessibility.findFirst();

    if (!accessibility) {
      accessibility = await this.prisma.accessibility.create({
        data: {
          statement: 'We are committed to ensuring digital accessibility for people with disabilities.',
          wcagLevel: 'AA',
          keyboardNavigation: true,
          screenReaderSupport: true,
          highContrastMode: true,
          textResizing: true,
          altTextRequired: true,
        },
      });
    }

    return accessibility;
  }

  async updateAccessibility(updateAccessibilityDto: UpdateAccessibilityDto) {
    const existingAccessibility = await this.prisma.accessibility.findFirst();

    let accessibility;
    if (existingAccessibility) {
      accessibility = await this.prisma.accessibility.update({
        where: { id: existingAccessibility.id },
        data: updateAccessibilityDto,
      });
    } else {
      accessibility = await this.prisma.accessibility.create({
        data: updateAccessibilityDto,
      });
    }

    this.logger.log('Accessibility configuration updated');
    return accessibility;
  }
}
