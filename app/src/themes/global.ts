import { createGlobalStyle } from 'styled-components';
import { isNumber } from 'util';

const GlobalStyles = createGlobalStyle`

  // Fonts
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400');
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700');

  // Reset
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 1.2;
  }
  input[type="button" i], input[type="submit" i], input[type="reset" i],
  input[type="file" i]::-webkit-file-upload-button, button {
    background-color: transparent;
  }

  // Limit the maximum width of all screens
  html {
    background-color: #eee;
    max-width: 60vh; // Force aspect ratio
    margin: 0 auto;
  }

  // Global styles
  body {
    font-family: 'Nunito', sans-serif;
    background-color: white;
    color: black;
    -webkit-font-smoothing: antialiased;
    max-width: 768px;
    margin: 0 auto;
  }
`;

const global = {
  colour: {
    red: 'red',
  },
  fonts: {
    body: {
      family: "'Nunito', serif;",
    },
    title: {
      family: "'Playfair Display', serif;",
      bold: 700,
    },
  },
  components: {
    circle : {
      width: {
        vm : '65vmin',
        pixels: '400px',
      },
    },
    imageReveal : {
      width: '34vmin',
    },
  },
};

function romanNumeralFromDecimal(decimal: number) {
  switch (decimal) {
    case 1 :
      return 'I';
    case 2 :
      return 'II';
    case 3 :
      return 'III';
    default :
      return 'not done';
  }
}

export {
  GlobalStyles,
  global,
  romanNumeralFromDecimal,
};
