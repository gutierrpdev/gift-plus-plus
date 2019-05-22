import styled from 'styled-components';

/**
 * Flex driven container for our panel parts
 */
interface Props {
  isParent?: boolean; // Should this Panel act as a parent for the child controls?
}
const Panel = styled.div<Props>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  z-index: 3;
  position: ${(props) => props.isParent === false ? null : 'relative'};
`;

/**
 * Inner part
 */
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 5; // keep above underlying stucture
  position: relative;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


export {
  PanelContent,
  Panel,
};
