import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { VIDEO_STORAGE_PATH } from 'src/consts/paths';
import { VideoRepository } from 'src/models/video/video.repository';
import { deleteDir } from 'src/utils/file';

@Injectable()
export class VideoDeleteService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.videoRepository.removeById(id);
    await deleteDir(path.join(VIDEO_STORAGE_PATH, id));
  }
}
