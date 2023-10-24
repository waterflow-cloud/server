export type VideoProcessOption = {
  compress: boolean;
};

export class VideoProcessTask {
  constructor(
    private readonly originalTempFilePath,
    private readonly options: VideoProcessOption,
    private readonly id: string,
  ) {}
}
