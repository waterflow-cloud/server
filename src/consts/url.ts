import { CONFIG } from './config';

const protocol = CONFIG.enableHttps ? 'https' : 'http';
const port = CONFIG.port === 80 || CONFIG.port === 443 ? '' : `:${CONFIG.port}`;
const hostname = CONFIG.hostname;

export const getFetchImageAPIPath = (id: string) => `${protocol}://${hostname}${port}/image/fetch/${id}`;
export const getFetchVideoAPIPath = (id: string) => `${protocol}://${hostname}${port}/video/fetch/${id}/m3u8`;

export const uploadImageAPIPath = `${protocol}://${hostname}${port}/image/upload`;
export const uploadVideoAPIPath = `${protocol}://${hostname}${port}/video/upload`;

export const deleteImageAPIPath = `${protocol}://${hostname}${port}/image/delete`;
export const deleteVideoAPIPath = `${protocol}://${hostname}${port}/video/delete`;

export const lockImageAPIPath = `${protocol}://${hostname}${port}/image/lock`;
export const lockVideoAPIPath = `${protocol}://${hostname}${port}/video/lock`;
