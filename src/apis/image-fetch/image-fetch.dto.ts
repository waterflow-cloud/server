export class ImageFetchImageQueries {
  width?: number;
  height?: number;
}

export type ImageFetchInfoAPIContent = {
  id: string;
  name: string | null;
  comment: string | null;
  category: string | null;
  timestamp: number;
  fileHash: string;
  width: number;
  height: number;
  size: number;
  locked: boolean;
};
