import { Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { TImageLookupAPIContent } from './image-lookup.dto';
import { ImageLookupService } from './image-lookup.service';

@Controller('image/lookup')
export class ImageLookupController {
  constructor(private readonly imageFetchService: ImageLookupService) {}

  @Get('/:id/lookup')
  @UseFilters(APIExceptionFilter)
  @UseInterceptors(APIInterceptor)
  async fetchInfo(@Param('id') id: string): Promise<TImageLookupAPIContent> {
    const info = this.imageFetchService.lookup(id);
    return info;
  }
}
