import styled from 'styled-components';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
`;

// todo: visible might not be required anymore
const StyledPanel = styled.div<PanelProps>`
  display: ${(props) => props.visible === false ? 'none' : 'flex'};
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export interface PanelProps {
  visible?: boolean;
}

export {
  PanelContent,
  StyledPanel,
};
