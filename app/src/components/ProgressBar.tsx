import React from 'react';
import styled from 'styled-components';

const ProgressBarInner = styled.div<Props>`
  background-color: white;
  width: ${(props) => props.percentage}%;
  height: 100%;
`;

const StyledProgressBar = styled.div`
  background-color: black;
  height: 2vw;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
`;

interface Props {
  percentage: number;
}
class ProgressBar extends React.PureComponent<Props, {}> {

  public render() {

    return (
      <StyledProgressBar>
        <ProgressBarInner {...this.props} />
      </StyledProgressBar>
    );
  }

}

export {
  ProgressBar,
};
