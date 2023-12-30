import { Controller, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { VideoDeleteParams } from './video-delete.dto';
import { VideoDeleteService } from './video-delete.service';

@Controller('video/delete')
@UseFilters(APIExceptionFilter)
@UseInterceptors(APIInterceptor)
export class VideoDeleteController {
  constructor(private readonly videoDeleteService: VideoDeleteService) {}

  @Post('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param() params: VideoDeleteParams) {
    await this.videoDeleteService.delete(params.id);
    return null;
  }
}
