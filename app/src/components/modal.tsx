import styled from 'styled-components';

/***
 * This is a base modal that others can inherit to ensure consistent behvaiour
 *
 */

const BaseModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; // High above everything else
`;

export {
  BaseModal,
};
