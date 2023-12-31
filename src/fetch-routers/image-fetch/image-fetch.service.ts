import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as sharp from 'sharp';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { IMAGE_FILE_PATH } from 'src/consts/paths';
import { ResourceException } from 'src/exceptions/resource.exception';
import { ImageRepository } from 'src/models/image/image.repository';
import { isFileExist } from 'src/utils/file';

@Injectable()
export class ImageFetchService {
  constructor(
    @Inject(DependenciesFlag.IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async fetchImage(id: string, width?: number, height?: number): Promise<{ format: string; buffer: Buffer }> {
    /** Query the entity in database record */
    const [errImageEntity, imageEntity] = await to(this.imageRepository.findBy({ id: id }));

    /** Process the locked/not-found exception for image resource */
    if (!isFileExist(IMAGE_FILE_PATH(id))) throw new ResourceException('ImageNotFound', 404);
    if (errImageEntity) throw new ResourceException('UnknownError', 500);
    if (imageEntity == null) throw new ResourceException('ImageNotFound', 404);
    if (imageEntity.locked) throw new ResourceException('ImageLocked', 403);

    const imageSharp = sharp(IMAGE_FILE_PATH(id));

    if (width || height) imageSharp.resize(width, height);
    const imageBuffer = await imageSharp.toBuffer();
    const imageExtname = (await imageSharp.metadata()).format;

    return { format: imageExtname, buffer: imageBuffer };
  }
}
