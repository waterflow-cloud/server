import { Controller, Get, Param, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { ResourceExceptionFilter } from 'src/request-circles/filters/resource-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { ImageFetchInfoAPIContent } from './image-fetch.dto';
import { ImageFetchService } from './image-fetch.service';

@Controller('image/fetch')
export class ImageFetchController {
  constructor(private readonly imageFetchService: ImageFetchService) {}

  @Get('/:id/info')
  @UseFilters(APIExceptionFilter)
  @UseInterceptors(APIInterceptor)
  async fetchInfo(@Param('id') id: string): Promise<ImageFetchInfoAPIContent> {
    const info = this.imageFetchService.fetchInfo(id);
    return info;
  }

  @Get('/:id')
  @UseFilters(ResourceExceptionFilter)
  async fetchImage(@Param('id') id: string, @Res() response: Response) {
    const image = await this.imageFetchService.fetchImage(id);
    response.setHeader('Content-Type', `image/${image.format}`);
    response.send(image.buffer);
  }
}
