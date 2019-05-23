import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ModalDialogOuter } from './base-modal-dialog';
import { Button, Buttons } from '../buttons';
import { TextResize } from '../text-resize';

/**
 * Terms & privacy modal
 */

const Inner = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
`;

const Texts = styled.div`
  text-align: center;
  padding: 5% 5% 4%;
  a {
    color: ${global.colour.darkRed};
    opacity: 0.7;
  }
`;

const TopText = styled(TextResize)`
  color: black;
  font-weight: 500;
  margin-bottom: 3%;
`;

const MainText = styled(TextResize)`
  color: ${global.colour.lightGreyText};
  margin-bottom: 5%;
  line-height: 1.2;
`;

const TermsLink = styled(TextResize)`
  margin-bottom: 2%;
  color: ${global.colour.darkRed};
  opacity: 0.7;
`;

interface Props {
  museumName: string; // Museum name to show in the wording
  onAgreeClick: () => void; // Callback when the agreen button is clicked
  onShowTerms: () => void; // Callback when the show terms button is clicked
}

const TermsModal: React.FC<Props> = ({ museumName, onAgreeClick, onShowTerms }) => {

  function handleAgreeClick() {
    if (onAgreeClick) {
      onAgreeClick();
    }
  }

  function handleShowTermsClick() {
    if (onShowTerms) {
      onShowTerms();
    }
  }

  return (
    <ModalDialogOuter>
      <Inner>

        <Texts>

          <TopText textSize={35}>Gift at {museumName} is produced by&nbsp;
            <a href='https://www.blasttheory.co.uk/' target='_blank'>Blast Theory</a>
          </TopText>

          <MainText textSize={35}>
            Blast Theory store and process your data to deliver this service and to make improvements.
            We will never share your personal information without your consent.
            Please press agree to continue.  If you'd like to learn more:
          </MainText>
          <TermsLink textSize={40} onClick={handleShowTermsClick}>Read our terms &amp; privacy</TermsLink>



        </Texts>

        <Buttons>
          <Button onClick={handleAgreeClick} colour='grey'>Agree and continue</Button>
        </Buttons>

      </Inner>
    </ModalDialogOuter>
  );

};

export {
  TermsModal,
};
