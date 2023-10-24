import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageDeleteController } from './image-delete.controller';
import { ImageDeleteService } from './image-delete.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageDeleteService],
  controllers: [ImageDeleteController],
})
export class ImageDeleteModule {}
