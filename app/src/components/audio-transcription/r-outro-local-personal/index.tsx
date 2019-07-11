import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroLocalPersonalTranscriptBrighton } from './r-outro-local-personal-brighton';
import { ROutroLocalPersonalTranscriptMunch } from './r-outro-local-personal-munch';


const Transcript = (museum.slug === 'brighton') ? ROutroLocalPersonalTranscriptBrighton
                  : (museum.slug === 'munch') ? ROutroLocalPersonalTranscriptMunch
                  : assertNever(museum.slug);


const ROutroLocalPersonalTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroLocalPersonalTranscript,
};
