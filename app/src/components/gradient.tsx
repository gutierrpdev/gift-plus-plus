import styled from 'styled-components';

interface GradientProps {
  position?: 'top' | 'bottom';
}

const Gradient = styled.div<GradientProps>`
  height: 20vmin;
  background: rgb(0,0,0); /* fallback */
  background: linear-gradient(180deg,rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 99%, transparent);
  z-index: 10;
  position: absolute;
  left: 0;
  width: 100%;
  top: ${(props) => props.position === 'top' ? 0 : 'auto'};
  bottom: ${(props) => props.position === 'bottom' ? '-20vmin' : 'auto'};
`;

export {
  Gradient,
};
