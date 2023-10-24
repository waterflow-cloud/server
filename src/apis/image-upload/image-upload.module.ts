import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageUploadService],
  controllers: [ImageUploadController],
})
export class ImageUploadModule {}
