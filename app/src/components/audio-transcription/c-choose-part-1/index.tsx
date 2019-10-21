import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CChoosePart1Demo } from './c-choose-part-1-demo';
import { CChoosePart1Brighton } from './c-choose-part-1-brighton';
import { CChoosePart1Munch } from './c-choose-part-1-munch';


const Transcript = (museum.slug === 'demo') ? CChoosePart1Demo
                 : (museum.slug === 'brighton') ? CChoosePart1Brighton
                 : (museum.slug === 'munch') ? CChoosePart1Munch
                 : assertNever(museum.slug);


const CChoosePart1: React.FC = () => {
  return <Transcript />;
};

export {
  CChoosePart1,
};
