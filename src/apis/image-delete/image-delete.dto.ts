import { IsString } from 'class-validator';

export class ImageDeleteParams {
  @IsString()
  id: string;
}
