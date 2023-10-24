import { Module } from '@nestjs/common';
import { ImageModelModule } from 'src/models/image/image.module';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoUpdateController } from './video-update.controller';
import { VideoUpdateService } from './video-update.service';

@Module({
  imports: [DataStorageModule, ImageModelModule],
  providers: [VideoUpdateService],
  controllers: [VideoUpdateController],
})
export class VideoUpdateModule {}
