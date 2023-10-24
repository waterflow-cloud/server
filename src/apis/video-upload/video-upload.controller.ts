import {
  Body,
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CONFIG } from 'src/consts/config';
import { VIDEO_TEMP_PATH } from 'src/consts/paths';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { ParamsValidationPipe } from 'src/request-circles/pipes/params-validation.pipe';
import * as uuid from 'uuid';
import {
  VideoUploadAPIContent,
  VideoUploadRequestBody,
} from './video-upload.dto';
import { VideoUploadService } from './video-upload.service';

@Controller('video/upload')
@UseFilters(APIExceptionFilter)
export class VideoUploadController {
  constructor(private readonly videoUploadService: VideoUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      limits: { fileSize: CONFIG.maxVideoUploadSize },
      storage: diskStorage({
        destination: VIDEO_TEMP_PATH,
        filename: (_req, file, cb) =>
          cb(null, `${uuid.v4()}${extname(file.originalname)}`),
      }),
    }),
  )
  @UsePipes(new ParamsValidationPipe())
  @UseInterceptors(APIInterceptor)
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Headers('X-api-token') apiToken,
    @Body() body: VideoUploadRequestBody,
  ): Promise<VideoUploadAPIContent> {
    return await this.videoUploadService.upload(file.path, {
      name: body.name,
      comment: body.comment,
      category: body.category,
      coverImage: body['cover-image'],
      noRepeat: body['no-repeat'] === 'true',
      useCompress: body['use-compress'] === 'true',
    });
  }
}
