export type IAPIResponse<T = any> = {
  code: number;
  message?: string[] | null;
  timestamp: number;
  content?: T | null;
};
