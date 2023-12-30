import { Controller, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { ImageDeleteParams } from './image-delete.dto';
import { ImageDeleteService } from './image-delete.service';

@Controller('image/delete')
@UseFilters(APIExceptionFilter)
@UseInterceptors(APIInterceptor)
export class ImageDeleteController {
  constructor(private readonly imageDeleteService: ImageDeleteService) {}

  @Post('/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param() params: ImageDeleteParams) {
    await this.imageDeleteService.delete(params.id);
    return null;
  }
}
