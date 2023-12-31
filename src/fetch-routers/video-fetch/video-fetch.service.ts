import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { VIDEO_STORAGE_PATH } from 'src/consts/paths';
import { ResourceException } from 'src/exceptions/resource.exception';
import { VideoRepository } from 'src/models/video/video.repository';
import { isFileExist } from 'src/utils/file';

@Injectable()
export class VideoFetchService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async fetchM3u8(id: string): Promise<string> {
    const m3u8FilePath = path.join(VIDEO_STORAGE_PATH, id, `${id}.m3u8`);

    /** Query the entity in database record */
    const [errVideoEntity, videoEntity] = await to(this.videoRepository.findBy({ id: id }));

    /** Process the locked/not-found exception for image resource */
    if (!isFileExist(m3u8FilePath)) throw new ResourceException('VideoNotFound', 404);
    if (errVideoEntity) throw new ResourceException('VideoLocked', 403);
    if (videoEntity == null) throw new ResourceException('VideoNotFound', 404);
    if (videoEntity.locked) throw new ResourceException('VideoLocked', 403);

    const m3u8Content = await fsp.readFile(m3u8FilePath, 'utf-8');

    return m3u8Content;
  }

  async fetchChuck(id: string, chuckFileName: string): Promise<Buffer> {
    const chuckFilePath = path.join(VIDEO_STORAGE_PATH, id, 'chunks', chuckFileName);
    const chunkBuffer = await fsp.readFile(chuckFilePath);
    return chunkBuffer;
  }
}
