import { Controller, Get, Param, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { ResourceExceptionFilter } from 'src/request-circles/filters/resource-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { VideoFetchInfoAPIContent } from './video-fetch.dto';
import { VideoFetchService } from './video-fetch.service';

@Controller('video/fetch')
export class VideoFetchController {
  constructor(private readonly videoFetchService: VideoFetchService) {}

  @Get('/:id/info')
  @UseFilters(APIExceptionFilter)
  @UseInterceptors(APIInterceptor)
  async fetchInfo(@Param('id') id: string): Promise<VideoFetchInfoAPIContent> {
    const info = this.videoFetchService.fetchInfo(id);
    return info;
  }

  @Get('/:id/m3u8')
  @UseFilters(ResourceExceptionFilter)
  async fetchM3u8(@Param('id') id: string, @Res() response: Response) {
    const content = await this.videoFetchService.fetchM3u8(id);
    response.setHeader('Content-Type', `application/x-mpegURL`);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(content);
  }

  @Get('/:id/chunks/:filename')
  @UseFilters(ResourceExceptionFilter)
  async fetchChunk(@Param('id') id: string, @Param('filename') filename: string, @Res() response: Response) {
    const chunk = await this.videoFetchService.fetchChuck(id, filename);
    response.setHeader('Content-Type', `video/mp2t`);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(chunk);
  }
}
