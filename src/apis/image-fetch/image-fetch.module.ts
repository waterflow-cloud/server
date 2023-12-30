import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageFetchController } from './image-fetch.controller';
import { ImageFetchService } from './image-fetch.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageFetchService],
  controllers: [ImageFetchController],
})
export class ImageFetchModule {}
