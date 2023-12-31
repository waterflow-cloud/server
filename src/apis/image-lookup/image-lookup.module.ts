import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageLookupController } from './image-lookup.controller';
import { ImageLookupService } from './image-lookup.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [ImageLookupService],
  controllers: [ImageLookupController],
})
export class ImageLookupModule {}
