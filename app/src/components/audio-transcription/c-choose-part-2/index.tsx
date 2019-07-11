import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CChoosePart2Brighton } from './c-choose-part-2-brighton';
import { CChoosePart2Munch } from './c-choose-part-2-munch';


const Transcript = (museum.slug === 'brighton') ? CChoosePart2Brighton
                  : (museum.slug === 'munch') ? CChoosePart2Munch
                  : assertNever(museum.slug);


const CChoosePart2: React.FC = () => {
  return <Transcript />;
};

export {
  CChoosePart2,
};
