import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroRemoteMuseumTranscriptBrighton } from './r-outro-remote-museum-brighton';
import { ROutroRemoteMuseumTranscriptMunch } from './r-outro-remote-museum-munch';


const Transcript = (museum.slug === 'brighton') ? ROutroRemoteMuseumTranscriptBrighton
                  : (museum.slug === 'munch') ? ROutroRemoteMuseumTranscriptMunch
                  : assertNever(museum.slug);


const ROutroRemoteMuseumTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroRemoteMuseumTranscript,
};
