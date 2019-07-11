import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CLetThemKnowPart3TranscriptBrighton } from './c-let-them-know-part-3-brighton';
import { CLetThemKnowPart3TranscriptMunch } from './c-let-them-know-part-3-munch';


const Transcript = (museum.slug === 'brighton') ? CLetThemKnowPart3TranscriptBrighton
                  : (museum.slug === 'munch') ? CLetThemKnowPart3TranscriptMunch
                  : assertNever(museum.slug);


const CLetThemKnowPart3Transcript: React.FC = () => {
  return <Transcript />;
};

export {
  CLetThemKnowPart3Transcript,
};
