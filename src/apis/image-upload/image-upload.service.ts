import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as crypto from 'crypto';
import * as fsp from 'fs/promises';
import * as path from 'path';
import * as sharp from 'sharp';
import { CONFIG } from 'src/consts/config';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { IMAGE_STORAGE_PATH } from 'src/consts/paths';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { getFetchImageAPIPath } from 'src/consts/url';
import { APIException } from 'src/exceptions/api.exception';
import { ImageRepository } from 'src/models/image/image.repository';
import { deleteFile, getFileSize } from 'src/utils/file';
import * as uniqId from 'uniqid';
import { ImageUploadAPIContent } from './image-upload.dto';

@Injectable()
export class ImageUploadService {
  constructor(
    @Inject(DependenciesFlag.IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async upload(
    fileTempPath: string,
    options: {
      name: string;
      comment?: string | null;
      category?: string | null;
      width?: number | null;
      height?: number | null;
      useWebp?: boolean;
      compress?: number;
      reuse?: boolean;
    },
  ): Promise<ImageUploadAPIContent> {
    /** Load and instant image data. */
    const tempImageFilePath = fileTempPath;
    const [errImageOriginBuffer, imageOriginBuffer] = await to(fsp.readFile(tempImageFilePath));
    if (errImageOriginBuffer) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }
    const sharpInstance = sharp(imageOriginBuffer);

    const [errImageMetaData, imageMetaData] = await to(sharpInstance.metadata());
    if (errImageMetaData) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.ILLEGAL_FILE_FORMAT);
    }

    /* Check the image format, only following formats listed are permitted */
    const validImageFormats = ['jpg', 'jpeg', 'svg', 'png', 'webp', 'gif', 'bmp', 'tif'];
    if (!validImageFormats.includes(imageMetaData.format)) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.ILLEGAL_FILE_FORMAT);
    }

    /** Resize the target image according to fit-mode if the width or height are specified. */
    if (options.height || options.width) {
      sharpInstance.resize(options.height, options.width);
    }

    /** Reformat target image with quality optimization. */
    const targetQuality = options.compress;
    const targetFileExtname = options.useWebp ? 'webp' : imageMetaData.format;
    try {
      sharpInstance.toFormat(targetFileExtname, { quality: targetQuality });
    } catch {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }

    /** Get the hash from image buffer */
    const [errImageBuffer, imageBuffer] = await to(sharpInstance.toBuffer());
    if (errImageBuffer) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }
    const hash = crypto.createHash('md5').update(imageBuffer).digest('hex');

    /* Generate a unique id for image entity. And id is the filename of image. */
    const imageId = uniqId(`${CONFIG.platformFlag}-`, `.${targetFileExtname}`);

    /**
     * If the noRepeat option is enabled,
     * it will first check whether there is an existing image record in the database,
     * and if it exists, use the existing image record and no longer output and upload it.
     * Otherwise output the uploaded image.
     */
    let targetFilePath, fileSize;
    const [errExistImageEntity, existImageEntity] = await to(this.imageRepository.findBy({ fileHash: hash }));
    if (errExistImageEntity) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }

    if (options.reuse && existImageEntity !== null) {
      targetFilePath = path.join(IMAGE_STORAGE_PATH, existImageEntity.id);
      fileSize = await getFileSize(targetFilePath);
      return {
        id: existImageEntity.id,
        size: fileSize,
        url: getFetchImageAPIPath(existImageEntity.id),
      };
    }

    targetFilePath = path.join(IMAGE_STORAGE_PATH, imageId);
    const [toFileErr] = await to(sharpInstance.toFile(targetFilePath));
    if (toFileErr) {
      deleteFile(tempImageFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }
    fileSize = await getFileSize(targetFilePath);

    /* Create and write the image entity into database storage */
    const [errCreateImageEntity] = await to(
      this.imageRepository
        .create({
          id: imageId,
          name: options.name,
          comment: options.comment,
          category: options.category,
          size: fileSize,
          width: imageMetaData.width,
          height: imageMetaData.height,
          locked: false,
          fileHash: hash,
        })
        .then((image) => this.imageRepository.save(image)),
    );
    if (errCreateImageEntity) {
      deleteFile(tempImageFilePath);
      deleteFile(targetFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR);
    }

    /**
     * Move the image file from temporary directory to storage directory,
     * then clean the temporary files.
     */
    deleteFile(tempImageFilePath);

    return {
      id: imageId,
      size: fileSize,
      url: getFetchImageAPIPath(imageId),
    };
  }
}
