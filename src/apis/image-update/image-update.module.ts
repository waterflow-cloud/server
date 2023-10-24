import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoDeleteController } from './image-update.controller';
import { ImageUpdateService } from './image-update.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageUpdateService],
  controllers: [VideoDeleteController],
})
export class ImageUpdateModule {}
