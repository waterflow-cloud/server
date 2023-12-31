import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ResourceExceptionFilter } from 'src/request-circles/filters/resource-exception.filter';
import { VideoFetchService } from './video-fetch.service';

@Controller('video/fetch')
export class VideoFetchController {
  constructor(private readonly service: VideoFetchService) {}

  @Get('/:id/m3u8')
  @UseFilters(ResourceExceptionFilter)
  async fetchM3u8(@Param('id') id: string, @Res() response: Response) {
    const content = await this.service.fetchM3u8(id);
    response.setHeader('Content-Type', `application/x-mpegURL`);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(content);
  }

  @Get('/:id/chunks/:filename')
  @UseFilters(ResourceExceptionFilter)
  async fetchChunk(@Param('id') id: string, @Param('filename') filename: string, @Res() response: Response) {
    const chunk = await this.service.fetchChuck(id, filename);
    response.setHeader('Content-Type', `video/mp2t`);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(chunk);
  }
}
