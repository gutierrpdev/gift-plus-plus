import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CShareTranscriptBrighton } from './c-share-brighton';
import { CShareTranscriptMunch } from './c-share-munch';


const Transcript = (museum.slug === 'brighton') ? CShareTranscriptBrighton
                  : (museum.slug === 'munch') ? CShareTranscriptMunch
                  : assertNever(museum.slug);


const CShareTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  CShareTranscript,
};
