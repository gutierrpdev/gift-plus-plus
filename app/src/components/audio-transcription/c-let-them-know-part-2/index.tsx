import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { CLetThemKnowPart2TranscriptBrighton } from './c-let-them-know-part-2-brighton';
import { CLetThemKnowPart2TranscriptMunch } from './c-let-them-know-part-2-munch';


const Transcript = (museum.slug === 'brighton') ? CLetThemKnowPart2TranscriptBrighton
                  : (museum.slug === 'munch') ? CLetThemKnowPart2TranscriptMunch
                  : assertNever(museum.slug);


const CLetThemKnowPart2Transcript: React.FC = () => {
  return <Transcript />;
};

export {
  CLetThemKnowPart2Transcript,
};