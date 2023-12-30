import { Module } from '@nestjs/common';
import { ImageDeleteModule } from './image-delete/image-delete.module';
import { ImageFetchModule } from './image-fetch/image-fetch.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { VideoDeleteModule } from './video-delete/video-delete.module';
import { VideoFetchModule } from './video-fetch/video-fetch.module';
import { VideoUploadModule } from './video-upload/video-upload.module';

@Module({
  imports: [
    ImageUploadModule,
    ImageFetchModule,
    ImageDeleteModule,
    VideoUploadModule,
    VideoFetchModule,
    VideoDeleteModule,
  ],
})
export class ApisModule {}
