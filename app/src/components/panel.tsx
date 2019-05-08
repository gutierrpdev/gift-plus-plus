import styled from 'styled-components';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 5; // keep above underlying stucture
  position: relative;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  z-index: 3;
  position: relative;
`;

export {
  PanelContent,
  Panel,
};
