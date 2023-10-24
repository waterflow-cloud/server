import uuid from 'uuid';
import { MD5 } from 'crypto-js';

const genKey = (): string => {
  const salt = uuid.v4();
  const key: string = MD5(salt).toString();
  return key;
};
