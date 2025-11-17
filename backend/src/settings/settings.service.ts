import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(private prisma: PrismaService) {}

  async getSettings() {
    let settings = await this.prisma.settings.findFirst();

    if (!settings) {
      settings = await this.prisma.settings.create({
        data: {
          siteName: 'SOOTHE TECHNOLOGIES',
        },
      });
    }

    return settings;
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const existingSettings = await this.prisma.settings.findFirst();

    let settings;
    if (existingSettings) {
      settings = await this.prisma.settings.update({
        where: { id: existingSettings.id },
        data: updateSettingsDto,
      });
    } else {
      settings = await this.prisma.settings.create({
        data: updateSettingsDto,
      });
    }

    this.logger.log('Settings updated');
    return settings;
  }
}
