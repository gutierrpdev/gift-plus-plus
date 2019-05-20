import { LocalFile } from '../domain';
import { CreatePreparedUploadResponse } from './api';
import { api } from './index';

type PreparedUpload = CreatePreparedUploadResponse;

/**
 * An AssetUploader is responsible for taking a LocalFile and uploading it to
 * the asset store. This involves getting a PreparedUpload from the api, and
 * then using this to upload to the asset store while reporting on the
 * upload-progress.
 *
 * An AssetUpload only exposes functionality to start running and be aborted.
 */
export class AssetUploader {

  private isRunning = false;
  private isAborted = false;
  private runningRequests = new Set<XMLHttpRequest>();

  private readonly file: LocalFile;
  private readonly onProgress: (progress: number) => void;
  private readonly onComplete: (upload: PreparedUpload) => void;
  private readonly onError: (error: Error) => void;

  /**
   *
   */
  public constructor({ file, onProgress, onComplete, onError }: {
    file: LocalFile;
    onProgress: (progress: number) => void;
    onComplete: (upload: PreparedUpload) => void;
    onError: (error: Error) => void;
  }) {
    this.file = file;
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onError = onError;
  }


  /**
   * Begin running this AssetUploader. Resolves with a PreparedUpload if
   * successful.
   *
   * NOTE: This function may only be called once, and cannot be called if
   * abort() has been called previously.
   */
  public run(): void {
    if (this.isAborted) throw new Error('AssetUploader already aborted');
    if (this.isRunning) throw new Error('AssetUploader can only run once');
    this.isRunning = true;

    (async () => {
      const preparedUploadResult = await api.createPreparedUpload({
        mimeType: this.file.mimeType,
      });
      if (this.isAborted) return;

      if (preparedUploadResult.kind !== 'ok') {
        throw new Error('Failed to create PreparedUpload');
      }
      const preparedUpload = preparedUploadResult.data;

      const blob = await fetch(this.file.url).then((resp) => {
        if (!resp.ok) throw new Error('Failed to convert file to Blob');
        return resp.blob();
      });
      if (this.isAborted) return;

      const formData = new FormData();
      Object.entries(preparedUpload.postFields).forEach(
        ([k, v]) => formData.append(k, v),
      );
      formData.append('file', blob);

      const uploadResp = await fetch(preparedUpload.postUrl, {
        method: 'POST',
        body: formData,
      });
      if (this.isAborted) return;

      if (!uploadResp.ok) {
        const respText = await uploadResp.text();
        throw new Error(`Upload failed [${uploadResp.status}]: ${respText}`);
      }

      this.onComplete(preparedUpload);

    })().catch((err) => {
      this.abort();
      this.onError(err);
    });
  }


  /**
   * Cancel this AssetUploader
   */
  public abort(): void {
    this.isAborted = true;
    this.runningRequests.forEach((req) => {
      try { req.abort(); } catch {}
    });
  }
}
