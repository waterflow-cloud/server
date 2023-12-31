import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIException } from 'src/exceptions/api.exception';
import { VideoRepository } from 'src/models/video/video.repository';
import { TVideoLookupAPIContent } from './video-lookup.dto';

@Injectable()
export class VideoLookupService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async lookup(id: string): Promise<TVideoLookupAPIContent | null> {
    const [errImageEntity, imageEntity] = await to(this.videoRepository.findBy({ id: id }));
    if (errImageEntity) throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    if (imageEntity === null) throw new APIException(API_STATUS_CODE.RESOURCE_NOT_FOUNT);
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
}
