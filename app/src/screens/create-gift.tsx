import React from 'react';
import { ScreenTitle } from '../components/screen-title';
import { GlobalStyles, NoScroll } from '../themes/global';

interface Props {
}

const CreateGift: React.FC<Props> = ({  }: Props) => (
  <>
    <GlobalStyles />
    <NoScroll />
    <ScreenTitle>Create Gift</ScreenTitle>
  </>
);

export default CreateGift;
