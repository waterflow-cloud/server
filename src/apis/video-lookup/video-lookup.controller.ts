import { Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { APIExceptionFilter } from 'src/request-circles/filters/api-exception.filter';
import { APIInterceptor } from 'src/request-circles/interceptors/api-interceptor';
import { TVideoLookupAPIContent } from './video-lookup.dto';
import { VideoLookupService } from './video-lookup.service';

@Controller('video/lookup')
export class VideoLookupController {
  constructor(private readonly videoFetchService: VideoLookupService) {}

  @Get('/:id/lookup')
  @UseFilters(APIExceptionFilter)
  @UseInterceptors(APIInterceptor)
  async fetchInfo(@Param('id') id: string): Promise<TVideoLookupAPIContent> {
    const info = this.videoFetchService.lookup(id);
    return info;
  }
}
