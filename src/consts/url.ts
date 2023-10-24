import { CONFIG } from './config';

const protocol = CONFIG.enableHttps ? 'https' : 'http';
const port = CONFIG.port === 80 || CONFIG.port === 443 ? '' : `:${CONFIG.port}`;
const hostname = CONFIG.hostname;

export const getFetchImageUrl = (id: string) =>
  `${protocol}://${hostname}${port}/image/fetch/${id}`;
export const getFetchVideoUrl = (id: string) =>
  `${protocol}://${hostname}${port}/video/fetch/${id}/m3u8`;
