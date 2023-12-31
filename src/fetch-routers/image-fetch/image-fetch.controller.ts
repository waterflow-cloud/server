import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ResourceExceptionFilter } from 'src/request-circles/filters/resource-exception.filter';
import { ImageFetchService } from './image-fetch.service';

@Controller('image/fetch')
export class ImageFetchController {
  constructor(private readonly imageFetchService: ImageFetchService) {}

  @Get('/:id')
  @UseFilters(ResourceExceptionFilter)
  async fetchImage(@Param('id') id: string, @Res() response: Response) {
    const image = await this.imageFetchService.fetchImage(id);
    response.setHeader('Content-Type', `image/${image.format}`);
    response.send(image.buffer);
  }
}
