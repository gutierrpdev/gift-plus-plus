import React from 'react';
import ScreenTitle from '../components/ScreenTitle';
import GlobalStyles from '../themes/global';

interface Props {
}

const CreateGift: React.FC<Props> = ({  }: Props) => (
  <>
    <GlobalStyles />
    <ScreenTitle>Create Gift</ScreenTitle>
  </>
);

export default CreateGift;
