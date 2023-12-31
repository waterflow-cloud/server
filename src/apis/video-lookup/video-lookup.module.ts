import { Module } from '@nestjs/common';
import { VideoModelModule } from 'src/models/video/video.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoLookupController } from './video-lookup.controller';
import { VideoLookupService } from './video-lookup.service';

@Module({
  imports: [DataStorageModule, VideoModelModule],
  providers: [VideoLookupService],
  controllers: [VideoLookupController],
})
export class VideoLookupModule {}
