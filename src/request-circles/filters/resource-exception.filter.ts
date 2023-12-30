import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import {
  IMAGE_BLOCKED_SKETCH_PATH,
  IMAGE_NOT_FOUND_SKETCH_PATH,
  VIDEO_BLOCKED_SKETCH_PATH,
  VIDEO_NOT_FOUND_SKETCH_PATH,
} from 'src/consts/paths';
import { ResourceException } from 'src/exceptions/resource.exception';

@Catch(ResourceException)
export class ResourceExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.exceptionType) {
      case 'ImageLocked':
        const LockedSketchImageBuffer = fs.readFileSync(IMAGE_BLOCKED_SKETCH_PATH);
        response.header('Content-Type', 'image/png');
        response.status(403).send(LockedSketchImageBuffer);
        break;
      case 'VideoLocked':
        const LockedSketchVideoBuffer = fs.readFileSync(VIDEO_BLOCKED_SKETCH_PATH);
        response.header('Content-Type', 'application/x-mpegURL');
        response.status(403).send(LockedSketchVideoBuffer);
        break;
      case 'ImageNotFound':
        const ImageNotFoundSketchBuffer = fs.readFileSync(IMAGE_NOT_FOUND_SKETCH_PATH);
        response.header('Content-Type', 'image/png');
        response.status(404).send(ImageNotFoundSketchBuffer);
        break;
      case 'VideoNotFound':
        const VideoNotFoundSketchBuffer = fs.readFileSync(VIDEO_NOT_FOUND_SKETCH_PATH);
        response.header('Content-Type', 'application/x-mpegURL');
        response.status(404).json(VideoNotFoundSketchBuffer);
        break;
    }
  }
}
