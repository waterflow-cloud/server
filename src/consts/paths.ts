import * as path from 'path';

export const ASSETS_PATH = path.resolve('./data/assets');
export const IMAGE_TEMP_PATH = path.resolve('./data/.image-temp');
export const IMAGE_PATH = path.resolve('./data/images');
export const VIDEO_TEMP_PATH = path.resolve('./data/.video-temp');
export const VIDEO_PATH = path.resolve('./data/videos');

export const IMAGE_NOT_FOUND_SKETCH_PATH = path.join(ASSETS_PATH, '404.png');
export const IMAGE_BLOCKED_SKETCH_PATH = path.join(ASSETS_PATH, 'locked.png');
export const VIDEO_NOT_FOUND_SKETCH_PATH = path.join(ASSETS_PATH, '404.png');
export const VIDEO_BLOCKED_SKETCH_PATH = path.join(ASSETS_PATH, 'locked.png');
