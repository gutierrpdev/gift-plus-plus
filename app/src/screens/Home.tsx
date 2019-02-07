import React from 'react';
import ScreenTitle from '../components/ScreenTitle';
import GlobalStyles from '../themes/global';

interface Props {
};

const Home: React.FC<Props> = ({}: Props) => (
  <>
    <GlobalStyles />
    <ScreenTitle>Welcome to Gift</ScreenTitle>
    <h1>Choose an option</h1>
  </>
);

export default Home;