import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentLocalPersonalTranscriptionBrighton } from './r-intro-content-local-personal-brighton';
import { RIntroContentLocalPersonalTranscriptionMunch } from './r-intro-content-local-personal-munch';


const Transcript = (museum.slug === 'brighton') ? RIntroContentLocalPersonalTranscriptionBrighton
                  : (museum.slug === 'munch') ? RIntroContentLocalPersonalTranscriptionMunch
                  : assertNever(museum.slug);


const RIntroContentLocalPersonalTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentLocalPersonalTranscription,
};
