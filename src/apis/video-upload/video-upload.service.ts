import * as fluentFFmpeg from 'fluent-ffmpeg';
import * as fsp from 'fs/promises';
import * as path from 'path';
import * as uniqId from 'uniqid';
import to from 'await-to-js';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIException } from 'src/exceptions/api.exception';
import { CONFIG } from 'src/consts/config';
import { convertUnit } from 'src/utils/calc';
import {
  deleteDir,
  deleteFile,
  getDirSize,
  getFileMD5Hash,
} from 'src/utils/file';
import { DependenciesFlag } from 'src/consts/dep-flags';
import { getFetchVideoUrl } from 'src/consts/url';
import { Inject, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { VIDEO_PATH } from 'src/consts/paths';
import { VideoRepository } from 'src/models/video/video.repository';
import { VideoUploadAPIContent } from './video-upload.dto';

@Injectable()
export class VideoUploadService {
  constructor(
    @Inject(DependenciesFlag.VIDEO_REPOSITORY)
    private readonly videoRepository: VideoRepository,
  ) {}

  async upload(
    fileTempPath: string,
    options: {
      name: string;
      comment?: string | null;
      category?: string | null;
      coverImage?: string | null;
      noRepeat?: boolean;
      useCompress?: boolean;
    },
  ): Promise<VideoUploadAPIContent> {
    const tempVideoFilePath = fileTempPath;
    /** Check the file mime information first */
    const [errVideoMeta, videoMeta] = await to(
      promisify<string, fluentFFmpeg.FfprobeData>(fluentFFmpeg.ffprobe)(
        tempVideoFilePath,
      ),
    );
    if (errVideoMeta) {
      deleteFile(tempVideoFilePath);
      throw new APIException(API_STATUS_CODE.ILLEGAL_FILE_FORMAT, 400);
    }
    const [errVideoHash, videoHash] = await to(getFileMD5Hash(fileTempPath));
    if (errVideoHash) {
      deleteFile(tempVideoFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR, 500);
    }

    const [errExistVideoEntity, existVideoEntity] = await to(
      this.videoRepository.findBy({ fileHash: videoHash }),
    );
    if (errExistVideoEntity) {
      deleteFile(tempVideoFilePath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR, 500);
    }
    if (options.noRepeat && existVideoEntity !== null) {
      deleteFile(tempVideoFilePath);
      return {
        id: existVideoEntity.id,
        url: getFetchVideoUrl(existVideoEntity.id),
      };
    }

    const {
      duration: videoDuration,
      height: videoHeight,
      width: videoWidth,
    } = videoMeta.streams.find((s) => s.codec_type === 'video');

    /* Generate a unique id for video entity. And id is the filename of video-m3u8 file. */
    const videoId = uniqId(`${CONFIG.platformFlag}-`);

    const targetStorageDirectoryPath = path.join(VIDEO_PATH, videoId);
    await fsp.mkdir(targetStorageDirectoryPath);

    /**
     * Define the ffmpeg command schema.
     * And then make optimization according to options.
     */
    await fsp.mkdir(path.join(targetStorageDirectoryPath, 'chunks'));
    const chuckFilesPath = path.join(
      targetStorageDirectoryPath,
      './chunks/video_%03d.ts',
    );
    const m3u8FilePath = path.join(
      targetStorageDirectoryPath,
      `${videoId}.m3u8`,
    );
    const ffmpegInstance = fluentFFmpeg()
      .input(fileTempPath)
      .addOption('-y')
      .videoCodec('libx264')
      .addOption('-maxrate', '800k')
      .addOption('-bufsize', '1600k')
      .audioBitrate('128k')
      .preset('medium')
      .addOption('-hls_time', '10')
      .addOption('-hls_list_size', '0')
      .addOption('-hls_base_url', './chunks/')
      .addOption('-hls_segment_filename', chuckFilesPath)
      .output(m3u8FilePath);
    if (options.useCompress) {
      ffmpegInstance
        .audioCodec('aac')
        .audioBitrate('128k')
        .videoBitrate('800k')
        .addOption('-crf', '23');
    }

    const runFfmpegTask = async (): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        ffmpegInstance
          .on('end', () => resolve())
          .on('error', (err) => reject(err))
          .run();
      });
    };

    const [errRunTask] = await to(runFfmpegTask());
    if (errRunTask) {
      console.log(errRunTask);
      deleteFile(tempVideoFilePath);
      deleteDir(targetStorageDirectoryPath);
      throw new APIException(API_STATUS_CODE.INTERNAL_ERROR, 500);
    }

    const videoSize = convertUnit(
      await getDirSize(targetStorageDirectoryPath),
      'Byte',
      'MB',
    );

    const [errCreateAndSaveVideo] = await to(
      this.videoRepository.createAndSave({
        id: videoId,
        name: options.name,
        comment: options.comment,
        category: options.category,
        size: videoSize,
        width: videoWidth,
        height: videoHeight,
        coverImage: options.coverImage,
        duration: parseInt(videoDuration),
        locked: false,
        fileHash: videoHash,
      }),
    );
    if (errCreateAndSaveVideo) {
      deleteFile(tempVideoFilePath);
      deleteDir(targetStorageDirectoryPath);
    }

    deleteFile(tempVideoFilePath);

    return {
      id: videoId,
      url: getFetchVideoUrl(videoId),
    };
  }
}