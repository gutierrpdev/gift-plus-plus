import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ProgressLoader } from '../progress-loader';

const LoadingGiftInner = styled.div`
  background-color: ${global.colour.darkGrey};
  width: 100%;
  height: 100%;
`;

interface Props {
  percent: number;
}

const LoadingGift: React.FC<Props> = ({ percent }) => {

  return (
    <LoadingGiftInner>
      <ProgressLoader text={'Loading'} colour={'light-grey'} percent={percent} />
    </LoadingGiftInner>
  );

};

export {
  LoadingGift,
};
