import React from 'react';
import styled from 'styled-components';

// todo this seems unused, check and delete

// Arranges the elements on the screen, using flex
const BackgroundImageStyle = styled.div<Props>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image: url(${(props) => props.backgroundImageUrl ? props.backgroundImageUrl : ''});
    background-position: center;
    background-size: cover;
    z-index: -1;
`;

interface Props {
  backgroundImageUrl?: string;
}

const BackgroundImage: React.FC<Props> = (props) => {
  return (
    <BackgroundImageStyle {...props}>
      {props.children}
    </BackgroundImageStyle>
  );
};

export {
  BackgroundImage,
};
