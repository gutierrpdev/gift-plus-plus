import React from 'react';
import styled from 'styled-components';

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

  // export const getOrientation = (file: File, callback: (Function)) => {
  //   var reader = new FileReader();

  //   reader.onload = (event: ProgressEvent) => {

  //     if (! event.target) {
  //       return;
  //     }

  //     const file = event.target as FileReader;
  //     const view = new DataView(file.result as ArrayBuffer);

  //     if (view.getUint16(0, false) != 0xFFD8) {
  //         return callback(-2);
  //     }

  //     const length = view.byteLength
  //     let offset = 2;

  //     while (offset < length)
  //     {
  //         if (view.getUint16(offset+2, false) <= 8) return callback(-1);
  //         let marker = view.getUint16(offset, false);
  //         offset += 2;

  //         if (marker == 0xFFE1) {
  //           if (view.getUint32(offset += 2, false) != 0x45786966) {
  //             return callback(-1);
  //           }

  //           let little = view.getUint16(offset += 6, false) == 0x4949;
  //           offset += view.getUint32(offset + 4, little);
  //           let tags = view.getUint16(offset, little);
  //           offset += 2;
  //           for (let i = 0; i < tags; i++) {
  //             if (view.getUint16(offset + (i * 12), little) == 0x0112) {
  //               return callback(view.getUint16(offset + (i * 12) + 8, little));
  //             }
  //           }
  //         } else if ((marker & 0xFF00) != 0xFF00) {
  //             break;
  //         }
  //         else {
  //             offset += view.getUint16(offset, false);
  //         }
  //     }
  //     return callback(-1);
  //   };

  //   reader.readAsArrayBuffer(file);
  // }

  // function resetOrientation(srcBase64: string, srcOrientation: number): string {

  //   const img = new Image();

  //   img.onload = () => {
  //     const width = img.width;
  //     const height = img.height;
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');

  //     // set proper canvas dimensions before transform & export
  //     if (4 < srcOrientation && srcOrientation < 9) {
  //       canvas.width = height;
  //       canvas.height = width;
  //     } else {
  //       canvas.width = width;
  //       canvas.height = height;
  //     }

  //     if (ctx) {

  //       // transform context before drawing image
  //       switch (srcOrientation) {
  //         case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
  //         case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
  //         case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
  //         case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
  //         case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
  //         case 7: ctx.transform(0, -1, -1, 0, height, width); break;
  //         case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
  //         default: break;
  //       }

  //       // draw image
  //       ctx.drawImage(img, 0, 0);

  //     }

  //     console.log('1');

  //     // export base64
  //     return canvas.toDataURL();
  //   };

  //   img.src = srcBase64;

  //   return '';
  // }

  // Handle the change of file on the input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    // Get the file from the list
    if (e.target.files) {

      // Get the file
      const file = e.target.files[0]; // Assuming one file

      // const reader = new FileReader();

      // let data = '';

      // reader.onload = () => {
      //   data = reader.result as string;
      //   // console.log(data);
      //   // data = resetOrientation(data, 3);
      //   // console.log(data);
      // };

      // reader.readAsDataURL(file);

      // Convert the file to a object url for performance in the browser
      const url = URL.createObjectURL(file);

      if (props.onPhotoTaken) {
        props.onPhotoTaken( url );
      }

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
