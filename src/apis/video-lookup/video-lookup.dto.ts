export type TVideoLookupAPIContent = {
  id: string;
  name: string | null;
  comment: string | null;
  category: string | null;
  coverImage: string | null;
  timestamp: number;
  fileHash: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  locked: boolean;
};
