import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { TImageTable } from 'src/types/table';
import { Image } from './image.entity';

type TCreateImageOptions = {
  id: string;
  name: string;
  comment: string | null;
  category: string | null;
  size: number;
  width: number;
  height: number;
  locked: boolean;
  fileHash: string;
};

type TFindImageConditions = {
  timeStart?: number;
  timeEnd?: number;
  id?: string;
  name?: string | null;
  fileHash?: string;
  category?: string | null;
  locked?: boolean;
};

export class ImageRepository {
  constructor(
    @Inject(DependenciesFlag.DATABASE_STORAGE)
    private readonly dataSource: Knex,
  ) {}

  async create(options: TCreateImageOptions): Promise<Image> {
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
      locked: options.locked,
      fileHash: options.fileHash,
    };
  }

  async createAndSave(options: TCreateImageOptions): Promise<Image> {
    const imageEntity = await this.create(options);
    await this.save(imageEntity);
    return imageEntity;
  }

  async save(entity: Image) {
    await this.dataSource.transaction((trx) =>
      trx('image')
        .insert({
          id: entity.id,
          name: entity.name,
          comment: entity.comment,
          category: entity.category,
          timestamp: entity.timestamp,
          size: entity.size,
          width: entity.width,
          height: entity.height,
          locked: entity.locked,
          fileHash: entity.fileHash,
        })
        .onConflict('id')
        .merge(),
    );
  }

  async findBy(condition: TFindImageConditions): Promise<Image | null> {
    const query = this.dataSource<TImageTable>('image');
    if (condition.id) query.where({ id: condition.id });
    if (condition.fileHash) query.where({ fileHash: condition.fileHash });
    if (condition.timeStart) query.where('timestamp', '>', condition.timeStart);
    if (condition.timeEnd) query.where('timestamp', '<', condition.timeEnd);
    if (condition.name) query.where({ name: condition.name });
    const resultFields = await query.orderBy('timestamp', 'desc');
    if (resultFields.length === 0) return null;
    const { id, name, comment, category, timestamp, size, width, height, locked, fileHash } = resultFields[0];
    return {
      id,
      name,
      comment,
      category,
      timestamp,
      size,
      width,
      height,
      locked,
      fileHash,
    };
  }

  async findAllBy(condition: TFindImageConditions): Promise<Image[]> {
    const query = this.dataSource<TImageTable>('image');
    if (condition.id) query.where({ id: condition.id });
    if (condition.fileHash) query.where({ fileHash: condition.fileHash });
    if (condition.timeStart) query.where('timestamp', '>', condition.timeStart);
    if (condition.timeEnd) query.where('timestamp', '<', condition.timeEnd);
    if (condition.name) query.where({ name: condition.name });
    const resultFields = await query.orderBy('timestamp', 'desc');
    return resultFields.map(({ id, name, comment, category, timestamp, size, width, height, locked, fileHash }) => ({
      id,
      name,
      comment,
      category,
      timestamp,
      size,
      width,
      height,
      locked,
      fileHash,
    }));
  }

  async removeById(id: string) {
    await this.dataSource('image').where({ id }).del();
  }
}
