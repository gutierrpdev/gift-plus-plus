import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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


export const UnderConstruction: React.FC = () => (
  <Container>
    <Heading>🚧 Under Construction 🚧</Heading>
    <Spinner>👷</Spinner>
    <Link to='/create-gift'>
      <button>New Gift</button>
    </Link>
    <Link to='/gift/cdfc5287-9d03-5c70-94f1-755d4480bfac'>
      <button>1 Part Example Gift</button>
    </Link>
    <Link to='/gift/2e73df73-4faf-5c0a-abaa-c3717fd3ef7c'>
      <button>2 Part Example Gift</button>
    </Link>
    <Link to='/gift/5475400c-684c-515f-8343-b9d14340de9c'>
      <button>3 Part Example Gift</button>
    </Link>
  </Container>
);
