import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIException } from 'src/exceptions/api.exception';
import { ImageRepository } from 'src/models/image/image.repository';
import { TImageLookupAPIContent } from './image-lookup.dto';

@Injectable()
export class ImageLookupService {
  constructor(
    @Inject(DependenciesFlag.IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async lookup(id: string): Promise<TImageLookupAPIContent | null> {
    const [errImageEntity, imageEntity] = await to(this.imageRepository.findBy({ id: id }));
    if (errImageEntity) throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    if (imageEntity === null) throw new APIException(API_STATUS_CODE.RESOURCE_NOT_FOUNT);
    return {
      id: imageEntity.id,
      name: imageEntity.name,
      comment: imageEntity.comment,
      category: imageEntity.category,
      timestamp: imageEntity.timestamp,
      fileHash: imageEntity.fileHash,
      width: imageEntity.width,
      height: imageEntity.height,
      size: imageEntity.size,
      locked: imageEntity.locked,
    };
  }
}
