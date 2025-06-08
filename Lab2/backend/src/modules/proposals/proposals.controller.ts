import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Roles } from '../users/users.decorators';
import { USER_ROLES } from '../users/user.constants';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, UpdateProposalDto } from './proposals.dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Roles(USER_ROLES.ADMIN, USER_ROLES.FREELANCER)
  @Post()
  async create(@Body() body: CreateProposalDto) {
    return this.proposalsService.create(body);
  }

  @Roles(USER_ROLES.ADMIN)
  @Get()
  async findAll() {
    return this.proposalsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.proposalsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateProposalDto) {
    return this.proposalsService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.proposalsService.deleteById(id);
  }
}
