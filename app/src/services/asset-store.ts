/**
 * An AssetStore is responsible for holding urls for all assets needed
 * throughout the app. It provides an interface to preload all the assets --
 * converting then to browser ObjectUrls.
 *
 * TODO: Expose interface via state and event subscription rather than awaiting promise.
 * TODO: Provide progress updates via subscription
 * TODO: Retry / error handling etc
 */
export class AssetStore {

  /**
   * Asset URLs should be retrieved from here.
   *
   * As assets are preloaded, the urls in here will be altered to browser local
   * ObjectUrls.
   */
  public assets = {
    cChoosePart1: require('../assets/audio/c-choose-part-1.m4a') as string,
    cChoosePart2: require('../assets/audio/c-choose-part-2.m4a') as string,
    cChoosePart3: require('../assets/audio/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('../assets/audio/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('../assets/audio/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('../assets/audio/c-let-them-know-part-3.m4a') as string,
    cStartGift: require('../assets/audio/c-start-gift.m4a') as string,
    rIntroContent1: require('../assets/audio/r-intro-content-1.m4a') as string,
    rOutroLocal: require('../assets/audio/r-outro-local.m4a') as string,
  };

  // For now we're not clever enough to run more than once and handle failures,
  // so we use this to ensure preload() is only called once.
  private preloadStarted = false;


  /**
   * Preload all the assets in the store and convert to browser local ObjectUrls.
   */
  public preload = async () => {
    // Prevent running more than once
    if (this.preloadStarted) return;
    this.preloadStarted = true;

    const promises = Object.entries(this.assets).map(([key, url]) => {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'blob';

        req.onload = () => {
          try {
            if (req.status !== 200) throw new Error();
            const objectUrl = URL.createObjectURL(req.response);
            (this.assets as any)[key] = objectUrl;
            resolve();
          } catch (err) {
            reject(err);
          }
        };

        req.onerror = reject;
        req.send();
      });
    });

    await Promise.all(promises);
  }
}
