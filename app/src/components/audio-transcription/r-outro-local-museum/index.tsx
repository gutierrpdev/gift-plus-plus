import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroLocalMuseumTranscriptBighton } from './r-outro-local-museum-brighton';
import { ROutroLocalMuseumTranscriptMunch } from './r-outro-local-museum-munch';


const Transcript = (museum.slug === 'brighton') ? ROutroLocalMuseumTranscriptBighton
                  : (museum.slug === 'munch') ? ROutroLocalMuseumTranscriptMunch
                  : assertNever(museum.slug);


const ROutroLocalMuseumTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroLocalMuseumTranscript,
};
