import React from 'react';
import useReactRouter from 'use-react-router';

import { GetGiftResponse } from '../common/schema';
import { useAsync, AsyncProgress } from '../utils/helpers';
import { api } from '../services';
import { ApiResult } from '../services/api';

// TODO: Consider using XMLHttpRequest or (perhaps better) switch to axios and
// use that for requests to allow monitoring progress and show total percentage
// loaded.

async function preloadAssets(eff: AsyncProgress<ApiResult<GetGiftResponse>>) {
  if (eff.kind !== 'success') return;
  if (eff.result.kind !== 'ok') return;

  const giftData = eff.result.data;

  const urls = giftData.parts.reduce(
    (urls, part) => { // tslint:disable-line no-shadowed-variable
      urls.add(part.note);
      urls.add(part.photo);
      return urls;
    },
    new Set<string>(),
  );

  const elements = Array.from(urls).map((url) => {
    const elm = document.createElement('img');
    elm.src = url;
    return elm;
  });

  await Promise.all(
    elements.map(
      (elm) => new Promise((resolve, reject) => {
        elm.addEventListener('load', () => resolve());
        elm.addEventListener('error', () => reject());
      }),
    ),
  );
}


export const ReceiveGift: React.FC = () => {
  const { match } = useReactRouter<{ giftId: string }>();
  const { giftId } = match.params;

  const [getGiftAsync] = useAsync(() => api.getGift(giftId), [giftId]);
  const [preloadAsync] = useAsync(() => preloadAssets(getGiftAsync), [getGiftAsync]);

  if (getGiftAsync.kind === 'running') return <h1>Loading (Gift): TODO</h1>;
  if (getGiftAsync.kind === 'failure') return <h1>Error (Gift): TODO</h1>;

  if (preloadAsync.kind === 'running') return <h1>Loading (Assets): TODO</h1>;
  if (preloadAsync.kind === 'failure') return <h1>Error (Assets): TODO</h1>;

  const apiResult = getGiftAsync.result;

  if (apiResult.kind === 'http-error' && apiResult.response.status === 404) {
    return <h1>NotFound (Gift): TODO</h1>;
  }
  if (apiResult.kind !== 'ok') return <h1>Error (Gift): TODO</h1>;


  const giftResponse = apiResult.data;
  return <pre>{JSON.stringify(giftResponse, null, 2)}</pre>;
};
