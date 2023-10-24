export class Image {
  public id: string;
  public name: string;
  public comment: string | null;
  public category: string;
  public timestamp: number;
  public size: number;
  public width: number;
  public height: number;
  public locked: boolean;
  public fileHash: string;
}
