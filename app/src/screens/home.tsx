import React from 'react';
import { ScreenTitle } from '../components/screen-title';
import { GlobalStyles } from '../themes/global';

export const Home: React.FC = () => (
  <>
    <GlobalStyles />
    <ScreenTitle>Welcome to Gift</ScreenTitle>
    <h1>Choose an option</h1>
  </>
);
