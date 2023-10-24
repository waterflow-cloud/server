export type ImageTable = {
  id: string;
  name: string;
  comment: string | null;
  category: string | null;
  timestamp: number;
  size: number;
  width: number;
  height: number;
  locked: boolean;
  fileHash: string;
};

export type VideoTable = {
  id: string;
  name: string;
  comment: string | null;
  category: string | null;
  timestamp: number;
  size: number;
  width: number;
  height: number;
  duration: number;
  locked: boolean;
  fileHash: string;
  coverImage: string | null;
};
