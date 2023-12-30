import { to } from 'await-to-js';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as fsp from 'fs/promises';

/**
 * Get the size of a file.
 * @param filePath - The path of the file.
 * @returns The size of the file, in bytes.
 */
export async function getFileSize(filePath: string): Promise<number> {
  const [, stat] = await to(fsp.stat(filePath));
  return stat?.size ?? 0;
}

/**
 * Get the size of a directory.
 * @param dirPath - The path of the directory.
 * @returns The size of the directory, in bytes.
 */
export async function getDirSize(dirPath: string): Promise<number> {
  const [, files] = await to(fsp.readdir(dirPath));
  let size = 0;
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const [, stat] = await to(fsp.stat(filePath));
    if (stat.isFile()) size += stat.size;
    else size += await getDirSize(filePath);
  }
  return size;
}

/**
 * Delete a file.
 * @param filePath - The path of the file to be deleted.
 * @returns A promise that resolves when the file is deleted.
 */
export async function deleteFile(filePath: string): Promise<void> {
  const [, stat] = await to(fsp.stat(filePath));
  if (stat.isFile()) await fsp.unlink(filePath);
  else await deleteDir(filePath);
}

/**
 * Delete a directory.
 * @param dirPath - The path of the directory to be deleted.
 */
export function deleteDir(dirPath: string): void {
  fs.rmdirSync(dirPath, { recursive: true });
}

/**
 * Get the MD5 hash of a file.
 * @param filePath - The path of the file.
 * @returns A promise that resolves with the MD5 hash of the file.
 */
export async function getFileMD5Hash(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

/**
 * Check if a file exists.
 * @param filePath - The path of the file.
 * @returns `true` if the file exists, `false` otherwise.
 */
export function isFileExist(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Check if a directory exists.
 * @param dirPath - The path of the directory.
 * @returns `true` if the directory exists, `false` otherwise.
 */
export function isDirExist(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}
