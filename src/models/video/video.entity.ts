/**
 * Represents a video entity.
 */
export class Video {
  /**
   * The unique identifier of the video.
   */
  public id: string;

  /**
   * The name of the video.
   */
  public name: string;

  /**
   * The comment associated with the video, if any.
   */
  public comment: string | null;

  /**
   * The category of the video, if any.
   */
  public category: string | null;

  /**
   * The timestamp of the video.
   */
  public timestamp: number;

  /**
   * The size of the video in bytes.
   */
  public size: number;

  /**
   * The width of the video in pixels.
   */
  public width: number;

  /**
   * The height of the video in pixels.
   */
  public height: number;

  /**
   * The duration of the video in seconds.
   */
  public duration: number;

  /**
   * Indicates whether the video is locked or not.
   */
  public locked: boolean;

  /**
   * The hash value of the video file.
   */
  public fileHash: string;

  /**
   * The cover image associated with the video, if any.
   */
  public coverImage: string | null;
}
