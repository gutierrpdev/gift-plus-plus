import React from 'react';
import useReactRouter from 'use-react-router';

import { useAsync } from '../utils/use-async';
import { usePreload, totalProgress } from '../utils/use-preload';
import { getLogger } from '../utils/logging';

import { api } from '../services';
import { GetGiftResponse } from '../services/api';

import { ReceiveGift } from '../components/receiving/receive-gift';


const logger = getLogger('receive-gift');


/**
 *
 */
export const ReceiveGiftScreen: React.FC = () => {
  const { match } = useReactRouter<{ giftId: string }>();
  const { giftId } = match.params;

  const [getGiftTask] = useAsync(() => api.getGift(giftId), [giftId]);

  const assetUrls = (getGiftTask.kind === 'success' && getGiftTask.result.kind === 'ok')
                  ? extractAssetUrls(getGiftTask.result.data)
                  : [];

  const [preloadState] = usePreload(assetUrls);


  if (getGiftTask.kind === 'running') return <h1>Loading (Gift): TODO</h1>;
  if (getGiftTask.kind === 'failure') return <h1>Error (Gift): TODO</h1>;

  const apiResult = getGiftTask.result;

  if (apiResult.kind === 'http-error' && apiResult.response.status === 404) {
    return <h1>NotFound (Gift): TODO</h1>;
  }
  if (apiResult.kind !== 'ok') return <h1>Error (Gift): TODO</h1>;


  if (preloadState.status === 'running') {
    return (
      <>
        <h1>Status: {preloadState.status}</h1>
        <h1>Progress: {Math.round(totalProgress(preloadState) * 100)}%</h1>
        <pre>{JSON.stringify(Array.from(preloadState.urlProgress.entries()), null, 2)}</pre>
        <pre>{JSON.stringify(Array.from(preloadState.urlData.entries()), null, 2)}</pre>
      </>
    );
  }
  if (preloadState.status === 'error') return <h1>Error (Assets): TODO</h1>;

  const giftResponse = apiResult.data;
  const preloadedAssetGift = substituteAssetUrls(giftResponse, preloadState.urlData);

  // TODO: Consider passing the asset map through directly, rather than altering
  // the gift data. More obvious / less surprising => less likely to cause bugs.
  // E.g. Currently ReceiveGift and it's children must NEVER save the gift as
  // the asset urls in it are only temporary.

  return <ReceiveGift gift={preloadedAssetGift} museumName={'Brighton & Hove Museum'} />;
};



/**
 *
 */
function extractAssetUrls(giftData: GetGiftResponse): string[] {
  const urls = giftData.parts.reduce<Set<string>>(
    (urls, part) => { // tslint:disable-line no-shadowed-variable
      urls.add(part.note);
      urls.add(part.photo);
      return urls;
    },
    new Set(),
  );

  urls.add(giftData.recipientGreeting);
  return Array.from(urls);
}


/**
 *
 */
function substituteAssetUrls(giftData: GetGiftResponse, assetUrlMap: Map<string, string>): GetGiftResponse {
  const newGiftData = Object.assign({}, giftData, {
    parts: giftData.parts.map((part) => Object.assign({}, part, {
      note: assetUrlMap.get(part.note)!,
      photo: assetUrlMap.get(part.photo)!,
    })),
    recipientGreeting: assetUrlMap.get(giftData.recipientGreeting)!,
  });

  return newGiftData;
}
