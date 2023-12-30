import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as path from 'path';
import * as sharp from 'sharp';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { IMAGE_PATH } from 'src/consts/paths';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIException } from 'src/exceptions/api.exception';
import { ResourceException } from 'src/exceptions/resource.exception';
import { ImageRepository } from 'src/models/image/image.repository';
import { fileExist } from 'src/utils/file';
import { ImageFetchInfoAPIContent } from './image-fetch.dto';

@Injectable()
export class ImageFetchService {
  constructor(
    @Inject(DependenciesFlag.IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async fetchInfo(id: string): Promise<ImageFetchInfoAPIContent | null> {
    const [errImageEntity, imageEntity] = await to(this.imageRepository.findBy({ id: id }));
    if (errImageEntity) throw new APIException(API_STATUS_CODE.INTERNAL_ERROR, 500);
    if (imageEntity === null) throw new APIException(API_STATUS_CODE.RESOURCE_NOT_FOUNT, 404);
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

  async fetchImage(id: string): Promise<{ format: string; buffer: Buffer }> {
    const imageFilePath = path.join(IMAGE_PATH, id);

    /** Query the entity in database record */
    const [errImageEntity, imageEntity] = await to(this.imageRepository.findBy({ id: id }));

    /** Process the locked/not-found exception for image resource */
    if (!fileExist(imageFilePath)) throw new ResourceException('ImageNotFound');
    if (errImageEntity) throw new ResourceException('ImageLocked');
    if (imageEntity == null) throw new ResourceException('ImageNotFound');
    if (imageEntity.locked) throw new ResourceException('ImageLocked');

    const imageSharp = sharp(imageFilePath);
    const imageBuffer = await imageSharp.toBuffer();
    const imageExtname = (await imageSharp.metadata()).format;

    return { format: imageExtname, buffer: imageBuffer };
  }
}
