import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { RIntroContentLocalMuseumTranscriptionBrighton } from './r-intro-content-local-museum-brighton';
import { RIntroContentLocalMuseumTranscriptionMunch } from './r-intro-content-local-museum-munch';


const Transcript = (museum.slug === 'brighton') ? RIntroContentLocalMuseumTranscriptionBrighton
                  : (museum.slug === 'munch') ? RIntroContentLocalMuseumTranscriptionMunch
                  : assertNever(museum.slug);


const RIntroContentLocalMuseumTranscription: React.FC = () => {
  return <Transcript />;
};

export {
  RIntroContentLocalMuseumTranscription,
};
