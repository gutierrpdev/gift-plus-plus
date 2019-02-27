import styled from 'styled-components';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
`;

const StyledPanel = styled.div<PanelProps>`
  display: ${(props) => props.visible === false ? 'none' : 'flex'};
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export interface PanelProps {
  visible?: boolean;
  onComplete?: () => void;
}

export {
  PanelContent,
  StyledPanel,
};
