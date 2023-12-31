import { Module } from '@nestjs/common';
import { VideoModelModule } from 'src/models/video/video.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoFetchController } from './video-fetch.controller';
import { VideoFetchService } from './video-fetch.service';

@Module({
  imports: [DataStorageModule, VideoModelModule],
  providers: [VideoFetchService],
  controllers: [VideoFetchController],
})
export class VideoFetchModule {}
