import React from 'react'
import styled from 'styled-components/macro';

const StyledPanel = styled.div`
  position: relative;
  height: 100vh;
  padding: 5vw 5vw;
  display: flex;
  flex-direction: column;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://picsum.photos/900/900/?image=678);
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
  }
`;

export default class Panel extends React.PureComponent {
  render() {
    return (
      <StyledPanel>{this.props.children}</StyledPanel>
    )
  }
}