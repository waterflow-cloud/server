import { Provider } from '@nestjs/common';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { dataSource } from './database-storage';

export const DataStorageProviders: Provider[] = [
  {
    provide: DependenciesFlag.DATABASE_STORAGE,
    useValue: dataSource,
  },
];
