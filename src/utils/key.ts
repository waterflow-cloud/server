import { MD5 } from 'crypto-js';
import uuid from 'uuid';

export const genKey = (): string => {
  const salt = uuid.v4();
  const key: string = MD5(salt).toString();
  return key;
};
