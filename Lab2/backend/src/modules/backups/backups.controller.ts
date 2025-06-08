import { Controller, Post, Get, Param } from '@nestjs/common';
import { Roles } from '../users/users.decorators';
import { USER_ROLES } from '../users/user.constants';
import { BackupsService } from './backups.service';

@Roles(USER_ROLES.ADMIN)
@Controller('backups')
export class BackupsController {
  constructor(private readonly backupService: BackupsService) {}

  @Get()
  async listBackups() {
    return this.backupService.listBackups();
  }

  @Post()
  async createBackup() {
    return this.backupService.createBackup();
  }

  @Post(':name')
  async restoreBackup(@Param('name') name: string) {
    return this.backupService.restoreBackup(name);
  }
}
