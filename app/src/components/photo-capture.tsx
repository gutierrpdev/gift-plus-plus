import React from 'react';
import styled from 'styled-components';

import { setImageOrientation,
  getImageOrientation,
  calcImageOrientationChange,
  landscapeImageOrientation,
} from '../utils/image';

import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';
import SvgIconCamera from './svg/icon-camera';

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
  height: 100%;
`;

const PhotoCaptureText = styled(PanelText)`
  height: 80%;
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
  display: none;
`;

// Buttons
const CaptureButton = styled(BaseControlButton)`
  width: 30%;
`;

interface Props {
  text: string;
  textSize?: number;
  showCamera?: boolean;
  onPhotoTaken?: ( fileUrl: string ) => void;
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

      // Get the file
      const file = e.target.files[0]; // Assuming one file

      // Convert the file to a object url for performance in the browser
      let url = URL.createObjectURL(file);

      // Some pictures will be landscape and will need converting to portrait
      // Get the current orientation and correct if necessary
      getImageOrientation(file, (orientation) => {

        if (orientation === landscapeImageOrientation) { // Landscape

          // Get the current orientation
          const change = calcImageOrientationChange(orientation);

          setImageOrientation(url, change, (rotatedImageUrl: string) =>  {

            url = rotatedImageUrl;

            // If we have a callback issue the url to it
            if (props.onPhotoTaken) {
              props.onPhotoTaken( url );
            }

          });

        } else {

          // If we have a callback issue the url to it
          if (props.onPhotoTaken) {
            props.onPhotoTaken( url );
          }

        }

      });

    }

  }

  return (
    <PanelRound background={'transparent-black'}>
      <PhotoCaptureStyle>
        <PhotoCaptureText textSize={props.textSize}>{props.text}</PhotoCaptureText>
        <Controls>
          <CaptureButton>
            <SvgIconCamera onClick={showCamera} />
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
