import { Module } from '@nestjs/common';
import { ImageFetchService } from './image-fetch.service';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageFetchController } from './image-fetch.controller';
import { ImageModelModule } from 'src/models/image/image.module';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageFetchService],
  controllers: [ImageFetchController],
})
export class ImageFetchModule {}
