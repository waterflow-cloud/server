import { Module } from '@nestjs/common';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';

@Module({
  imports: [DataStorageModule],
  providers: [MonitorService],
  controllers: [MonitorController],
})
export class ImageFetchModule {}
