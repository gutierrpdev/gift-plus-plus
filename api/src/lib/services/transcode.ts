import { ReadStream } from 'fs';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as uuidv4 from 'uuid/v4';
import * as ffmpeg from 'fluent-ffmpeg';

import { getLogger } from '../../util-libs/logging';

const logger = getLogger('lib:transcode');


interface TranscodeResult {
  stream: ReadStream;
  extension: string;
  mimeType: string;
}

export class TranscodeService {

  /**
   * Transcode an audio input into AAC format in an MP4 container (m4a).
   *
   * See: https://trac.ffmpeg.org/wiki/Encode/AAC
   *
   * ffmpeg -i input.wav -c:a aac -ac 1 -b:a 64k -movflags +faststart output.m4a
   *
   * Uses:
   * - native aac encoder
   * - hard limit to 5mins max
   * - downmix to mono
   * - target bitrate 64k
   * - enable progressive download
   *
   * Consider adding:
   * - normalization
   * - silence detection
   * - libfdk_aac
   */
  public async transcodeAudio(input: string | ReadStream): Promise<TranscodeResult> {
    const fileName = `${uuidv4()}.m4a`;
    const filePath = path.join(os.tmpdir(), fileName);

    logger.debug('OutputPath', filePath);

    return new Promise((res, rej) => {
      ffmpeg({ logger })
        .input(input)
        .output(filePath)
        .duration('00:05:00')
        .audioChannels(1)
        .audioCodec('aac')
        .audioBitrate('64k')
        .outputOptions([
          '-movflags',
          '+faststart',
        ])
        .on('stderr', (line: string) => {
          logger.debug(`FfmpegStdErr: ${line}`);
        })
        .on('end', () => {
          const stream = fs.createReadStream(filePath);
          const result = {
            stream,
            extension: 'm4a',
            mimeType: 'audio/m4a',
          };
          fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) logger.error(unlinkError, 'CleanupError');
            logger.debug('TranscodeResult', result);
            res(result);
          });
        })
        .on('error', (err) => {
          logger.error(err, 'FfmpegError');

          // If any output was written, attempt to clean it up before returning
          fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) logger.debug('CleanupError', unlinkError);
            rej(err);
          });
        })
        .run();
    });
  }


  /**
   */
  public transcodeImage(): void {}
}
