import { Body, Controller, Headers, Post, UploadedFile, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CONFIG } from 'src/consts/config';
import { IMAGE_TEMP_PATH } from 'src/consts/paths';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { ParamsValidationPipe } from 'src/request-circles/pipes/params-validation.pipe';
import * as uuid from 'uuid';
import { ImageUploadAPIContent, ImageUploadRequestBody } from './image-upload.dto';
import { ImageUploadService } from './image-upload.service';

@Controller('image/upload')
@UseFilters(APIExceptionFilter)
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image-file', {
      limits: { fileSize: CONFIG.maxImageUploadSize },
      storage: diskStorage({
        destination: IMAGE_TEMP_PATH,
        filename: (_req, file, cb) => cb(null, `${uuid.v4()}${extname(file.originalname)}`),
      }),
    }),
  )
  @UsePipes(new ParamsValidationPipe())
  @UseInterceptors(APIInterceptor)
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Headers('X-api-token') apiToken,
    @Body() body: ImageUploadRequestBody,
  ): Promise<ImageUploadAPIContent> {
    return await this.imageUploadService.upload(file.path, {
      name: body.name,
      comment: body.comment,
      category: body.category,
      height: body.height,
      width: body.width,
      useWebp: body['use-webp'] === 'true',
      reuse: body.reuse === 'true',
      compress: body.compress,
    });
  }
}
