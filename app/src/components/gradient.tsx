import styled from 'styled-components';

interface GradientProps {
  position?: 'top' | 'bottom';
}

const Gradient = styled.div<GradientProps>`
  height: 2vmin;
  background: rgb(0,0,0); /* fallback */
  background: linear-gradient(180deg,rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 24%, rgba(0,0,0,0) 99%, transparent);
  z-index: 10;
  position: absolute;
  left: 0;
  width: 100%;
  top: ${(props) => props.position === 'top' ? 0 : 'auto'};
  bottom: ${(props) => props.position === 'bottom' ? '-2vmin' : 'auto'};
`;

export {
  Gradient,
};
