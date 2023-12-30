import { Controller, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CONFIG } from 'src/consts/config';
import { IMAGE_TEMP_PATH } from 'src/consts/paths';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { ParamsValidationPipe } from 'src/request-circles/pipes/params-validation.pipe';
import * as uuid from 'uuid';
import { VideoUpdateInfoParams } from './video-update.dto';
import { VideoUpdateService } from './video-update.service';

@Controller('image/update')
@UseFilters(APIExceptionFilter)
@UseInterceptors(APIInterceptor)
export class VideoUpdateController {
  constructor(private readonly imageDeleteService: VideoUpdateService) {}

  @Post('/:id')
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
  async updateImage(@Param('id') id: string) {
    await this.imageDeleteService.delete(id);
    return null;
  }

  @Post('/:id/info')
  @UsePipes(new ValidationPipe())
  async updateInfo(@Param() params: VideoUpdateInfoParams) {
    await this.imageDeleteService.delete(params.id);
    return null;
  }
}
