import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { VIDEO_PATH } from 'src/consts/paths';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIException } from 'src/exceptions/api.exception';
import { ResourceException } from 'src/exceptions/resource.exception';
import { VideoRepository } from 'src/models/video/video.repository';
import { fileExist } from 'src/utils/file';
import { VideoFetchInfoAPIContent } from './video-fetch.dto';

@Injectable()
export class VideoFetchService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async fetchInfo(id: string): Promise<VideoFetchInfoAPIContent | null> {
    const [errImageEntity, imageEntity] = await to(this.videoRepository.findBy({ id: id }));
    if (errImageEntity) throw new APIException(API_STATUS_CODE.INTERNAL_ERROR, 500);
    if (imageEntity === null) throw new APIException(API_STATUS_CODE.RESOURCE_NOT_FOUNT, 404);
    return {
      id: imageEntity.id,
      name: imageEntity.name,
      comment: imageEntity.comment,
      category: imageEntity.category,
      timestamp: imageEntity.timestamp,
      coverImage: imageEntity.coverImage,
      fileHash: imageEntity.fileHash,
      width: imageEntity.width,
      height: imageEntity.height,
      duration: imageEntity.duration,
      size: imageEntity.size,
      locked: imageEntity.locked,
    };
  }

  async fetchM3u8(id: string): Promise<string> {
    const m3u8FilePath = path.join(VIDEO_PATH, id, `${id}.m3u8`);

    /** Query the entity in database record */
    const [errVideoEntity, videoEntity] = await to(this.videoRepository.findBy({ id: id }));

    /** Process the locked/not-found exception for image resource */
    if (!fileExist(m3u8FilePath)) throw new ResourceException('VideoNotFound');
    if (errVideoEntity) throw new ResourceException('VideoLocked');
    if (videoEntity == null) throw new ResourceException('VideoNotFound');
    if (videoEntity.locked) throw new ResourceException('VideoLocked');

    const m3u8Content = await fsp.readFile(m3u8FilePath, 'utf-8');

    return m3u8Content;
  }

  async fetchChuck(id: string, chuckFileName: string): Promise<Buffer> {
    const chuckFilePath = path.join(VIDEO_PATH, id, 'chunks', chuckFileName);
    const chunkBuffer = await fsp.readFile(chuckFilePath);
    return chunkBuffer;
  }
}
