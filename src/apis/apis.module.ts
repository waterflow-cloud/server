import { Module } from '@nestjs/common';
import { ImageDeleteModule } from './image-delete/image-delete.module';
import { ImageLookupModule } from './image-lookup/image-lookup.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { VideoDeleteModule } from './video-delete/video-delete.module';
import { VideoLookupModule } from './video-lookup/video-lookup.module';
import { VideoUploadModule } from './video-upload/video-upload.module';

@Module({
  imports: [
    ImageUploadModule,
    ImageLookupModule,
    ImageDeleteModule,
    VideoUploadModule,
    VideoLookupModule,
    VideoDeleteModule,
  ],
})
export class ApisModule {}
