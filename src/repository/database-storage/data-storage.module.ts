import { Module } from '@nestjs/common';
import { DataStorageProviders } from './data-storage.providers';

@Module({
  providers: [...DataStorageProviders],
  exports: [...DataStorageProviders],
})
export class DataStorageModule {}
