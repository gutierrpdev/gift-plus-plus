import React from 'react';
import useReactRouter from 'use-react-router';

import { useAsync, AsyncProgress } from '../utils/helpers';
import { getLogger } from '../utils/logging';

import { GetGiftResponse } from '../common/schema';
import { api } from '../services';
import { ApiResult } from '../services/api';

const logger = getLogger('receive-gift');

// TODO: Consider using XMLHttpRequest or (perhaps better) switch to axios and
// use that for requests to allow monitoring progress and show total percentage
// loaded.

async function preloadAssets(getGiftTask: AsyncProgress<ApiResult<GetGiftResponse>>) {
  if (getGiftTask.kind !== 'success') return;
  if (getGiftTask.result.kind !== 'ok') return;

  const giftData = getGiftTask.result.data;

  const urls = giftData.parts.reduce<Set<string>>(
    (urls, part) => { // tslint:disable-line no-shadowed-variable
      urls.add(part.note);
      urls.add(part.photo);
      return urls;
    },
    new Set(),
  );

  logger.debug('Preloading urls', urls);

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

  const [getGiftTask] = useAsync(() => api.getGift(giftId), [giftId]);
  const [preloadTask] = useAsync(() => preloadAssets(getGiftTask), [getGiftTask]);

  if (getGiftTask.kind === 'running') return <h1>Loading (Gift): TODO</h1>;
  if (getGiftTask.kind === 'failure') return <h1>Error (Gift): TODO</h1>;

  if (preloadTask.kind === 'running') return <h1>Loading (Assets): TODO</h1>;
  if (preloadTask.kind === 'failure') return <h1>Error (Assets): TODO</h1>;

  const apiResult = getGiftTask.result;

  if (apiResult.kind === 'http-error' && apiResult.response.status === 404) {
    return <h1>NotFound (Gift): TODO</h1>;
  }
  if (apiResult.kind !== 'ok') return <h1>Error (Gift): TODO</h1>;

  const giftResponse = apiResult.data;
  return <pre>{JSON.stringify(giftResponse, null, 2)}</pre>;
};
