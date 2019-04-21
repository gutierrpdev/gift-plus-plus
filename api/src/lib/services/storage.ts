import * as S3 from 'aws-sdk/clients/s3';
import * as uuidv4 from 'uuid/v4';

// ------
// Domain
// ------

interface PreparedUpload {
  postUrl: string;
  postFields: S3.PresignedPost.Fields;
  fileUri: string;
  fileType: string;
}


function mkPreparedUpload(s3UploadData: S3.PresignedPost): PreparedUpload {
  return {
    postUrl: s3UploadData.url,
    postFields: s3UploadData.fields,
    fileUri: `${s3UploadData.url}/${s3UploadData.fields.key}`,
    fileType: s3UploadData.fields['Content-Type'],
  };
}



interface StorageServiceConfig {
  awsAccessKey: string;
  awsSecretAccessKey: string;
  awsBucket: string;
  awsRegion: string;
  prefix: string;
}


export class StorageService {

  private s3: S3;
  private prefix: string;

  /**
   * Instantiate a StorageService.
   */
  public constructor(config: StorageServiceConfig) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretAccessKey,
      },
      params: {
        Bucket: config.awsBucket,
      },
      region: config.awsRegion,
    });

    this.prefix = config.prefix;
  }


  /**
   * Prepare pre-signed post data that can be used to upload directly to our
   * storage.
   *
   * NOTE: The uploaded file is stored in a private temporary location.
   */
  public async createPreparedUpload(mimeType: string): Promise<PreparedUpload> {
    const uploadData = await this.s3.createPresignedPost({
      Fields: {
        'key': this.generateStorageKey(),
        'acl': 'private',
        'Content-Type': mimeType,
        'Cache-Control': 'private',
      },
      Expires: 60 * 60 * 24,
    });
    const preparedUpload = mkPreparedUpload(uploadData);

    return preparedUpload;
  }


  private generateStorageKey(): string {
    return `${this.prefix}/uploads/${uuidv4()}`;
  }
}
