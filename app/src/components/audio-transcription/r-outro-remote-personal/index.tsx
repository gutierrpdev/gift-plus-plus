import React from 'react';
import { assertNever } from '../../../utils/helpers';

import { museum } from '../../../data';
import { ROutroRemotePersonalTranscriptBrighton } from './r-outro-remote-personal-brighton';
import { ROutroRemotePersonalTranscriptMunch } from './r-outro-remote-personal-munch';


const Transcript = (museum.slug === 'brighton') ? ROutroRemotePersonalTranscriptBrighton
                  : (museum.slug === 'munch') ? ROutroRemotePersonalTranscriptMunch
                  : assertNever(museum.slug);


const ROutroRemotePersonalTranscript: React.FC = () => {
  return <Transcript />;
};

export {
  ROutroRemotePersonalTranscript,
};
