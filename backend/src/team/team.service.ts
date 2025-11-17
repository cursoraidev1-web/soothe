import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    const teamMembers = await this.prisma.team.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return teamMembers;
  }

  async create(createTeamMemberDto: CreateTeamMemberDto) {
    const teamMember = await this.prisma.team.create({
      data: createTeamMemberDto,
    });

    this.logger.log(`Team member created: ${teamMember.firstName} ${teamMember.lastName}`);
    return teamMember;
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    const teamMember = await this.prisma.team.findUnique({ where: { id } });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    const updatedTeamMember = await this.prisma.team.update({
      where: { id },
      data: updateTeamMemberDto,
    });

    this.logger.log(`Team member updated: ${id}`);
    return updatedTeamMember;
  }

  async remove(id: string) {
    const teamMember = await this.prisma.team.findUnique({ where: { id } });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    await this.prisma.team.delete({ where: { id } });

    this.logger.log(`Team member deleted: ${id}`);
    return { message: 'Team member deleted successfully' };
  }
}
