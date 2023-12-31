import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class ImageUpdateInfoParams {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment?: string | null;

  @IsOptional()
  @IsString()
  category?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  width?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  height?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  compress?: number | null;

  @IsOptional()
  @IsIn(['true', 'false'])
  'use-webp'?: 'true' | 'false' | null;
}
