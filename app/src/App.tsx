import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: teal;
`;

const Heading = styled.h1`
  font-size: 6vw;
  color: white;
  animation: shake infinite 1s linear;

  @keyframes shake {
    0% { transform: translateY(0px); }
    25% { transform: translateY(5px); }
    75% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
`;

const Spinner = styled.div`
  font-size: 30vmin;
  animation: spin infinite 2s linear;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const App: React.FC = () => (
  <Container>
    <Heading>🚧 Under Construction 🚧</Heading>
    <Spinner>👷</Spinner>
  </Container>
);

export default App;
