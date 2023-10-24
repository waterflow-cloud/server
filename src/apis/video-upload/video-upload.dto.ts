import { IsIn, IsOptional, IsString } from 'class-validator';

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
  'no-repeat'?: 'true' | 'false' | null;

  @IsOptional()
  @IsString()
  'cover-image'?: string | null;

  @IsOptional()
  @IsIn(['true', 'false'])
  'use-compress'?: 'true' | 'false' | null;
}

export type VideoUploadAPIContent = {
  id: string;
  url: string;
};
