/* import axios from 'axios'; */
import React from 'react';
import useReactRouter from 'use-react-router';

import { useAsync } from '../utils/use-async';
import { usePreload, totalProgress } from '../utils/use-preload';
import { getLogger } from '../utils/logging';

import { api } from '../services';
import { GetGiftResponse } from '../services/api';

import { ReceiveGift } from './receive-gift';


const logger = getLogger('receive-gift');


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

  return Array.from(urls);
}


export const ReceiveGiftWip: React.FC = () => {
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
        <h1>Loading (Assets): {totalProgress(preloadState)}%</h1>
        <pre>{JSON.stringify(Array.from(preloadState.urlProgress.entries()), null, 2)}</pre>
      </>
    );
  }
  if (preloadState.status === 'error') return <h1>Error (Assets): TODO</h1>;


  const giftResponse = apiResult.data;
  return <ReceiveGift gift={giftResponse} museumName={'Brighton & Hove Museum'} />;

};
