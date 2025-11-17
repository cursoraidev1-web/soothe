import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all team members (Public)' })
  @ApiResponse({ status: 200, description: 'Team members retrieved successfully' })
  findAll() {
    return this.teamService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create team member (Admin only)' })
  @ApiResponse({ status: 201, description: 'Team member created successfully' })
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamService.create(createTeamMemberDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update team member (Admin only)' })
  @ApiResponse({ status: 200, description: 'Team member updated successfully' })
  update(@Param('id') id: string, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamService.update(id, updateTeamMemberDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete team member (Admin only)' })
  @ApiResponse({ status: 200, description: 'Team member deleted successfully' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
