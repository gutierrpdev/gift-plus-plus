import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';

/**
 * Capture photo from users camera
 *
 */
const PhotoCaptureStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PhotoCaptureText = styled(PanelText)`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5% 10%;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ImageInput = styled.input`
  visibility: hidden;
`;

// Buttons
const CaptureButton = styled(BaseControlButton)`
  width: 30%;
  border-radius: 50%;
`;

interface Props {
  text: string;
  onPhotoTaken?: () => void;
}

const PhotoCapture: React.FC<Props> = (props) => {

  // Show the camera to the user
  function showCamera() {

    // Trigger the input element
    const input = document.getElementById('photo-capture-input');
    if (input) {
      input.click();
    }
  }

  // Handle the change of file on the input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    // Get the file from the list
    if (e.target.files) {
      const file = e.target.files[0];
      // alert(file);
      // console.log(file);

      // todo probably pass the photo to the callback event?
      if (props.onPhotoTaken) {
        props.onPhotoTaken(); // pass back file?
      }
    }

  }

  return (
    <PanelRound background={'transparent-black'}>
      <PhotoCaptureStyle>
        <PhotoCaptureText>{props.text}</PhotoCaptureText>
        <Controls>
          <CaptureButton >
            <img src={require('../assets/svg/button-audio-record.svg')} onClick={showCamera} />
            <ImageInput
              id='photo-capture-input'
              type='file'
              accept='image/*'
              capture='camera'
              onChange={handleChange}
              src={require('../assets/svg/button-audio-record.svg')}
            />
          </CaptureButton>
        </Controls>
      </PhotoCaptureStyle>
    </PanelRound>
  );
};

export {
  PhotoCapture,
};
