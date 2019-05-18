import React from 'react';
import useReactRouter from 'use-react-router';

import { useAsync } from '../utils/use-async';
import { usePreload, totalProgress } from '../utils/use-preload';
import { getLogger } from '../utils/logging';

import { api } from '../services';
import { GetGiftResponse } from '../services/api';

import { ReceiveGift } from '../components/receiving/receive-gift';
import { WorkingProgress } from '../components/messages/working-progress';
import { ErrorMessage } from '../components/messages/error-message';

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


  if (getGiftTask.kind === 'running') return <WorkingProgress text='Loading' percent={0} />;
  if (getGiftTask.kind === 'failure') {
    return <ErrorMessage message='There was an issue retrieving the gift from our server' />;
  }

  const apiResult = getGiftTask.result;

  if (apiResult.kind === 'http-error' && apiResult.response.status === 404) {
    return <ErrorMessage message='Gift not found' />;
  }
  if (apiResult.kind !== 'ok') {
    return <ErrorMessage message='There was an issue retrieving the gift from our server' />;
  }

  if (preloadState.status === 'running') {
    return <WorkingProgress text='Loading' percent={Math.round(totalProgress(preloadState) * 100)} />;
  }
  if (preloadState.status === 'error') return <ErrorMessage message='Assets not found' />;

  const giftResponse = apiResult.data;
  const preloadedAssetGift = substituteAssetUrls(giftResponse, preloadState.urlData);

  // TODO: Consider passing the asset map through directly, rather than altering
  // the gift data. More obvious / less surprising => less likely to cause bugs.
  // E.g. Currently ReceiveGift and it's children must NEVER save the gift as
  // the asset urls in it are only temporary.

  return <ReceiveGift gift={preloadedAssetGift} museumName={'Brighton Museum'} />;
};



/**
 * Given a gift, extract the urls which will need to be preloaded for an offline
 * receiving experience.
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
 * Given a gift, replace any urls which have a substitute provided in the given
 * assetUrlMap.
 *
 * Note: This is a non-mutating which returns new gift data.
 */
function substituteAssetUrls(giftData: GetGiftResponse, assetUrlMap: Map<string, string>): GetGiftResponse {
  const newGiftData = Object.assign({}, giftData, {
    parts: giftData.parts.map((part) => Object.assign({}, part, {
      note: assetUrlMap.has(part.note) ? assetUrlMap.get(part.note) : part.note,
      photo: assetUrlMap.has(part.photo) ? assetUrlMap.get(part.photo) : part.photo,
    })),
    recipientGreeting: assetUrlMap.has(giftData.recipientGreeting)
                     ? assetUrlMap.get(giftData.recipientGreeting)
                     : giftData.recipientGreeting,
  });

  return newGiftData;
}
