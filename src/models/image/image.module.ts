import { Module, Provider } from '@nestjs/common';
import { DataStorageModule } from 'src/repository/database-storage/data-storage.module';
import { ImageRepository } from './image.repository';
import { DependenciesFlag } from 'src/consts/dep-flags';

const ImageRepositoryProvider: Provider = {
  provide: DependenciesFlag.IMAGE_REPOSITORY,
  useClass: ImageRepository,
};

@Module({
  imports: [DataStorageModule],
  providers: [ImageRepositoryProvider],
  exports: [ImageRepositoryProvider],
})
export class ImageModelModule {}
