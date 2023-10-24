import { IsString } from 'class-validator';

export class VideoDeleteParams {
  @IsString()
  id: string;
}
