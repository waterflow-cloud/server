import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class VideoUpdateInfoParams {
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
  @IsIn(['fill', 'inside', 'outside', 'cover', 'contain'])
  'fit-mode'?: 'fill' | 'inside' | 'outside' | 'cover' | 'contain' | null;
}
