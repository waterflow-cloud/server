/**
 * Represents an image entity.
 */
export class Image {
  /**
   * The unique identifier of the image.
   */
  public id: string;
  /**
   * The name of the image.
   */
  public name: string;
  /**
   * The comment associated with the image, if any.
   */
  public comment: string | null;
  /**
   * The category of the image.
   */
  public category: string;
  /**
   * The timestamp of when the image was created.
   */
  public timestamp: number;
  /**
   * The size of the image in bytes.
   */
  public size: number;
  /**
   * The width of the image in pixels.
   */
  public width: number;
  /**
   * The height of the image in pixels.
   */
  public height: number;
  /**
   * Indicates whether the image is locked or not.
   */
  public locked: boolean;
  /**
   * The hash value of the image file.
   */
  public fileHash: string;
}
