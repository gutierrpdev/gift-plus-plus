import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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


const Home: React.FC = () => (
  <Container>
    <Heading>🚧 Under Construction 🚧</Heading>
    <Spinner>👷</Spinner>
    <Link to='/gift'>Receive Gift</Link>
  </Container>
);


const ReceiveGift: React.FC = () => (
  <>
    <h1>ReceiveGift</h1>
    <Link to='/'>Home</Link>
  </>
);


const NotFound: React.FC = () => (
  <>
    <h1>Sorry, we couldn't find that page</h1>
    <p>TODO!!!</p>
  </>
);


const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route path='/gift' component={ReceiveGift} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
