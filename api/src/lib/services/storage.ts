import * as S3 from 'aws-sdk/clients/s3';
import * as uuidv4 from 'uuid/v4';
import { ReadStream } from 'fs';

// ------
// Domain
// ------

interface PreparedUpload {
  postUrl: string;
  postFields: S3.PresignedPost.Fields;
  fileUrl: string;
  fileType: string;
}


function mkPreparedUpload(s3UploadData: S3.PresignedPost): PreparedUpload {
  return {
    postUrl: s3UploadData.url,
    postFields: s3UploadData.fields,
    fileUrl: `${s3UploadData.url}/${s3UploadData.fields.key}`,
    fileType: s3UploadData.fields.ContentType,
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
  private bucket: string;
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

    this.bucket = config.awsBucket;
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
        Key: this.generateUploadKey(),
        ACL: 'private',
        ContentType: mimeType,
        CacheControl: 'private',
        ServerSideEncryption: 'AES256',
      },
      Expires: 60 * 60 * 24,
    });
    const preparedUpload = mkPreparedUpload(uploadData);

    return preparedUpload;
  }


  /**
   * Retrieve an item from our storage.
   */
  public async getUserUpload(): Promise<void> {
    const getObjectRequest = this.s3.getObject({
      Bucket: this.bucket,
      Key: '',
    });
    await getObjectRequest.promise();
  }


  /**
   * Upload an asset to our storage.
   *
   * Assets are expected to be immutable and are stored publicly with long cache
   * headers.
   */
  public async uploadAsset(name: string, mimeType: string, body: ReadStream): Promise<void> {
    const managedUpload = this.s3.upload({
      Bucket: this.bucket,
      Key: this.generateAssetKey(name),
      Body: body,
      ACL: 'public-read',
      ContentType: mimeType,
      CacheControl: PUBLIC_CACHING,
      ServerSideEncryption: 'AES256',
    });
    await managedUpload.promise();
  }


  private generateUploadKey(): string {
    return `${this.prefix}/uploads/${uuidv4()}`;
  }

  private generateAssetKey(name: string): string {
    return `${this.prefix}/assets/${name}`;
  }
}

const ONE_YEAR = 31536000; // Seconds
const PUBLIC_CACHING = `public, max-age=${ONE_YEAR}, stale-while-revalidate=${ONE_YEAR}, stale-if-error=${ONE_YEAR}`;
