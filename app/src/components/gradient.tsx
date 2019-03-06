import styled from 'styled-components';

interface GradientProps {
  position?: 'top' | 'bottom';
}

const Gradient = styled.div<GradientProps>`
  height: 4vmin;
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 17%, rgba(0,0,0,0.7) 27%, rgba(0,0,0,0) 90%);
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export {
  Gradient,
};
