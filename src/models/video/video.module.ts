import { Module, Provider } from '@nestjs/common';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { VideoRepository } from './video.repository';

const VideoRepositoryProvider: Provider = {
  provide: DependenciesFlag.VIDEO_REPOSITORY,
  useClass: VideoRepository,
};

@Module({
  imports: [DataStorageModule],
  providers: [VideoRepositoryProvider],
  exports: [VideoRepositoryProvider],
})
export class VideoModelModule {}
