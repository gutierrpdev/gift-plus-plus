import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CLetThemKnowPart1TranscriptBrighton } from './c-let-them-know-part-1-brighton';
import { CLetThemKnowPart1TranscriptMunch } from './c-let-them-know-part-1-munch';


const Transcript = (museum.slug === 'brighton') ? CLetThemKnowPart1TranscriptBrighton
                  : (museum.slug === 'munch') ? CLetThemKnowPart1TranscriptMunch
                  : assertNever(museum.slug);


const CLetThemKnowPart1Transcript: React.FC = () => {
  return <Transcript />;
};

export {
  CLetThemKnowPart1Transcript,
};
