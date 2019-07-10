import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { ModalDialogOuter } from './base-modal-dialog';
import { Buttons, Button, ButtonAnchor } from '../buttons';
import { TextResize } from '../text-resize';

/**
 * Feedback modal
 */

const Outer = styled(ModalDialogOuter)`
  position: fixed;
`;

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

interface Props {
  feedbackUrl: string;
  onFinished: () => void; // Callback when the modal is finished with
}

const FeedbackModal: React.FC<Props> = ({ feedbackUrl, onFinished }) => {

  function handleOnFinished() {
    onFinished();
  }

  return (
    <Outer>
      <Inner>

        <Texts>

          <TopText textSize={35}>Thank you for using Gift</TopText>

          <MainText textSize={35}>
            We'd love to know what you thought of Gift. If you have 5 minutes, please tell us about your experience.
          </MainText>

        </Texts>

        <Buttons>
          <Button onClick={handleOnFinished} colour='grey'>No, thanks</Button>
          <ButtonAnchor
            href={feedbackUrl}
            target='_blank'
            onClick={handleOnFinished}
            colour='grey'
          >
            Continue
          </ButtonAnchor>
        </Buttons>

      </Inner>
    </Outer>
  );

};

export {
  FeedbackModal,
};
