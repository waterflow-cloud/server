import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { TVideoTable } from 'src/types/table';
import { Video } from './video.entity';

type TCreateVideoOptions = {
  id: string;
  name: string;
  comment: string | null;
  category: string | null;
  size: number;
  width: number;
  height: number;
  coverImage: string;
  duration: number;
  locked: boolean;
  fileHash: string;
};

type TFindVideoConditions = {
  timeStart?: number;
  timeEnd?: number;
  id?: string;
  name?: string | null;
  fileHash?: string;
  category?: string | null;
  locked?: boolean;
};

export class VideoRepository {
  constructor(
    @Inject(DependenciesFlag.DATABASE_STORAGE)
    private readonly dataSource: Knex,
  ) {}

  async create(options: TCreateVideoOptions): Promise<Video> {
    const timestamp = Date.now();
    return {
      id: options.id,
      name: options.name,
      comment: options.comment,
      category: options.category ?? 'others',
      timestamp: timestamp,
      size: options.size,
      width: options.width,
      height: options.height,
      duration: options.duration,
      locked: options.locked,
      fileHash: options.fileHash,
      coverImage: options.coverImage,
    };
  }

  async createAndSave(options: TCreateVideoOptions): Promise<Video> {
    const videoEntity = await this.create(options);
    await this.save(videoEntity);
    return videoEntity;
  }

  async save(entity: Video) {
    await this.dataSource.transaction((trx) =>
      trx<TVideoTable>('video')
        .insert({
          id: entity.id,
          name: entity.name,
          comment: entity.comment,
          category: entity.category,
          timestamp: entity.timestamp,
          duration: entity.duration,
          size: entity.size,
          width: entity.width,
          height: entity.height,
          locked: entity.locked,
          fileHash: entity.fileHash,
          coverImage: entity.coverImage,
        })
        .onConflict('id')
        .merge(),
    );
  }

  async findBy(condition: TFindVideoConditions): Promise<Video | null> {
    const query = this.dataSource<TVideoTable>('video');
    if (condition.id) query.where({ id: condition.id });
    if (condition.fileHash) query.where({ fileHash: condition.fileHash });
    if (condition.timeStart) query.where('timestamp', '>', condition.timeStart);
    if (condition.timeEnd) query.where('timestamp', '<', condition.timeEnd);
    if (condition.name) query.where({ name: condition.name });
    const resultFields = await query.orderBy('timestamp', 'desc');
    if (resultFields.length === 0) return null;
    return {
      id: resultFields[0].id,
      name: resultFields[0].name,
      comment: resultFields[0].comment,
      category: resultFields[0].category,
      timestamp: resultFields[0].timestamp,
      duration: resultFields[0].duration,
      size: resultFields[0].size,
      width: resultFields[0].width,
      height: resultFields[0].height,
      locked: resultFields[0].locked,
      fileHash: resultFields[0].fileHash,
      coverImage: resultFields[0].coverImage,
    };
  }

  async findAllBy(condition: TFindVideoConditions): Promise<Video[]> {
    const query = this.dataSource<TVideoTable>('video');
    if (condition.id) query.where({ id: condition.id });
    if (condition.fileHash) query.where({ fileHash: condition.fileHash });
    if (condition.timeStart) query.where('timestamp', '>', condition.timeStart);
    if (condition.timeEnd) query.where('timestamp', '<', condition.timeEnd);
    if (condition.name) query.where({ name: condition.name });
    const resultFields = await query.orderBy('timestamp', 'desc');
    return resultFields.map((resultField) => ({
      id: resultField.id,
      name: resultField.name,
      comment: resultField.comment,
      category: resultField.category,
      timestamp: resultField.timestamp,
      duration: resultField.duration,
      size: resultField.size,
      width: resultField.width,
      height: resultField.height,
      locked: resultField.locked,
      fileHash: resultField.fileHash,
      coverImage: resultField.coverImage,
    }));
  }

  async removeById(id: string) {
    await this.dataSource('video').where({ id }).del();
  }
}
