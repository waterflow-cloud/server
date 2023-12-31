import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class VideoUploadRequestBody {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment?: string | null;

  @IsOptional()
  @IsString()
  category?: string | null;

  @IsOptional()
  @IsIn(['true', 'false'])
  reuse?: 'true' | 'false' | null;

  @IsOptional()
  @IsString()
  'cover-image'?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  compress?: number | null;
}

export type VideoUploadAPIContent = {
  id: string;
  url: string;
};
