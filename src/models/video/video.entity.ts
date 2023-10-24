export class Video {
  public id: string;
  public name: string;
  public comment: string | null;
  public category: string | null;
  public timestamp: number;
  public size: number;
  public width: number;
  public height: number;
  public duration: number;
  public locked: boolean;
  public fileHash: string;
  public coverImage: string | null;
}
