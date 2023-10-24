import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { IMAGE_PATH } from 'src/consts/paths';
import { ImageRepository } from 'src/models/image/image.repository';
import { deleteFile } from 'src/utils/file';

@Injectable()
export class ImageUpdateService {
  constructor(
    @Inject(DependenciesFlag.IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.imageRepository.removeById(id);
    await deleteFile(path.join(IMAGE_PATH, id));
  }
}
