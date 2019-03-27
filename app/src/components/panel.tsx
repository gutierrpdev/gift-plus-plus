import styled from 'styled-components';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 5; // keep above underlying stucture
`;

// todo: visible might not be required anymore
const Panel = styled.div<PanelProps>`
  display: ${(props) => props.visible === false ? 'none' : 'flex'};
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  z-index: 3;
`;

interface PanelProps {
  visible?: boolean;
}

export {
  PanelContent,
  Panel,
};
