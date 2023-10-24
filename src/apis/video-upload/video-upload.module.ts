import { Module } from '@nestjs/common';
import { VideoModelModule } from 'src/models/video/video.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoUploadController } from './video-upload.controller';
import { VideoUploadService } from './video-upload.service';

@Module({
  imports: [DataStorageModule, VideoModelModule],
  providers: [VideoUploadService],
  controllers: [VideoUploadController],
})
export class VideoUploadModule {}
