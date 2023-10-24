import { to } from 'await-to-js';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as fsp from 'fs/promises';

export async function getFileSize(filePath: string): Promise<number> {
  const [, stat] = await to(fsp.stat(filePath));
  return stat?.size ?? 0;
}

export async function getDirSize(dirPath) {
  let size = 0;
  try {
    const files = await fsp.readdir(dirPath);
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      const stats = await fsp.stat(filePath);
      if (stats.isFile()) {
        size += stats.size;
      } else if (stats.isDirectory()) {
        size += await getDirSize(filePath);
      }
    }
  } catch (error) {
    return 0;
  }
  return size;
}

export async function deleteFile(filePath: string): Promise<void> {
  await to(fsp.unlink(filePath));
}

export function deleteDir(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const filePath = `${dirPath}/${file}`;
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
      else deleteDir(filePath);
    });
    fs.rmdirSync(dirPath);
  }
}

export async function getFileMD5Hash(filePath): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

export function fileExist(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
