import { Module } from '@nestjs/common';
import { VideoModelModule } from 'src/models/video/video.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoDeleteController } from './video-delete.controller';
import { VideoDeleteService } from './video-delete.service';

@Module({
  imports: [DataStorageModule, VideoModelModule],
  providers: [VideoDeleteService],
  controllers: [VideoDeleteController],
})
export class VideoDeleteModule {}
