import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { IMAGE_PATH } from 'src/consts/paths';
import { VideoRepository } from 'src/models/video/video.repository';
import { deleteFile } from 'src/utils/file';

@Injectable()
export class VideoUpdateService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.videoRepository.removeById(id);
    await deleteFile(path.join(IMAGE_PATH, id));
  }
}
