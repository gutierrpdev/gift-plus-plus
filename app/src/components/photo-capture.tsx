import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';
import { TextResize } from './text-resize';

/**
 * Capture photo from users camera
 * Includes a text prompt
 *
 */
const PhotoCaptureStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PhotoCaptureText = styled(PanelText)`
  height: 70%;
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
`;

interface Props {
  text: string;
  textSize?: number;
  showCamera?: boolean;
  onPhotoTaken?: () => void;
}

const PhotoCapture: React.FC<Props> = (props) => {

  // Check for initial props
  if (props.showCamera) {
    showCamera();
  }

  // Show the camera to the user
  function showCamera() {

    // Trigger the input element
    const input = document.getElementById('photo-capture-input'); // todo, improve
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
        <PhotoCaptureText textSize={props.textSize}>{props.text}</PhotoCaptureText>
        <Controls>
          <CaptureButton >
            <img src={require('../assets/svg/icon-camera.svg')} onClick={showCamera} />
            <ImageInput
              id='photo-capture-input'
              type='file'
              accept='image/*'
              onChange={handleChange}
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
