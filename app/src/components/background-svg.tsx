import React from 'react';

import { assertNever } from '../utils/helpers';
import { museum } from '../data';
import { BgSvgFullScreen } from './svg/bg';
import { BgOrangeFullScreen } from './bg-orange';

/***
 * Return the background SVG for the current museum
 */

const Background = (museum.slug === 'brighton') ? BgSvgFullScreen
                   : (museum.slug === 'munch') ? BgOrangeFullScreen
                   : assertNever(museum.slug);


const BackgroundSvg: React.FC = () => {
  return <Background />;
};

export {
  BackgroundSvg,
};
