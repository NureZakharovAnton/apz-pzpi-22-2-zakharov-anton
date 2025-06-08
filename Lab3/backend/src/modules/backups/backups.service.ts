import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

@Injectable()
export class BackupsService {
  private readonly backupDir = path.join(process.cwd(), 'backups');

  constructor() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `backup-${timestamp}`);

      const command = `mongodump --uri="${process.env.MONGO_URI}" --out="${backupPath}"`;

      const { stderr } = await execAsync(command);

      if (stderr && !stderr.includes('done dumping')) {
        throw new Error(stderr);
      }

      return {
        success: true,
        message: 'Backup created successfully',
        path: backupPath,
        timestamp,
      };
    } catch (error) {
      throw new Error(`Backup failed: ${error.message}`);
    }
  }

  async listBackups() {
    try {
      const files = await fs.promises.readdir(this.backupDir);
      return files.map((file) => ({
        name: file,
        path: path.join(this.backupDir, file),
        createdAt: fs.statSync(path.join(this.backupDir, file)).birthtime,
      }));
    } catch (error) {
      throw new Error(`Failed to list backups: ${error.message}`);
    }
  }

  async restoreBackup(backupName: string) {
    try {
      const backupPath = path.join(this.backupDir, backupName, 'db');

      if (!fs.existsSync(backupPath)) {
        throw new Error('Backup not found');
      }

      const command = `mongorestore --uri="${process.env.MONGO_URI}" --drop --nsInclude="db.*" "${backupPath}"`;

      const { stderr } = await execAsync(command);

      if (stderr && !stderr.includes('successfully')) {
        throw new Error(stderr);
      }

      const successMatch = stderr.match(
        /(\d+) document\(s\) restored successfully/,
      );
      const restoredCount = successMatch ? parseInt(successMatch[1]) : 0;

      return {
        success: true,
        message: `Backup restored successfully. ${restoredCount} documents restored.`,
        backupName,
        restoredCount,
      };
    } catch (error) {
      throw new Error(`Restore failed: ${error.message}`);
    }
  }
}
