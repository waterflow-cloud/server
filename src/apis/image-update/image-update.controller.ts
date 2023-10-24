import {
  Controller,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ImageUpdateInfoParams } from './image-update.dto';
import { ImageUpdateService } from './image-update.service';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CONFIG } from 'src/consts/config';
import { IMAGE_TEMP_PATH } from 'src/consts/paths';
import { ParamsValidationPipe } from 'src/request-circles/pipes/params-validation.pipe';
import * as uuid from 'uuid';

@Controller('image/update')
@UseFilters(APIExceptionFilter)
@UseInterceptors(APIInterceptor)
export class VideoDeleteController {
  constructor(private readonly imageDeleteService: ImageUpdateService) {}

  @Post('/:id')
  @UseInterceptors(
    FileInterceptor('image-file', {
      limits: { fileSize: CONFIG.maxImageUploadSize },
      storage: diskStorage({
        destination: IMAGE_TEMP_PATH,
        filename: (_req, file, cb) =>
          cb(null, `${uuid.v4()}${extname(file.originalname)}`),
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
  async updateInfo(@Param() params: ImageUpdateInfoParams) {
    await this.imageDeleteService.delete(params.id);
    return null;
  }
}
