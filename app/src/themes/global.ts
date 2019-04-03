import { createGlobalStyle } from 'styled-components';

const global = {
  mobile: {
    endPixels: 768,
  },
  desktop: {
    startPixels: 769,
  },
  colour: {
    whiteText: '#FFFFFF',
    blackText: '#000000',
    darkGrey: '#333333',
    lightGrey: '#999999',
    brightRed: '#ff3333',
    darkRed: '#cc3333',
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
        vmCompact: '55vmin',
        pixels: '400px',
      },
    },
    imageReveal : {
      width: '32.5vmin',
    },
  },
};

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
    line-height: 1;
    box-sizing: border-box;
  }
  input[type="button" i], input[type="submit" i], input[type="reset" i],
  input[type="file" i]::-webkit-file-upload-button, button {
    background-color: transparent;
  }

  /* text areas */
  input[type="text"], input[type="email"], input[type="password"], textarea {
    font-family: 'Nunito', sans-serif;
    width: 100%;
    max-width: 95%;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    box-sizing: border-box;
    border-radius: 2rem;
    padding: 3vw;
    @media (min-width: ${global.desktop.startPixels}px) {
      padding: 20px;
    }
  }

  /* single line inputs */
  input[type="text"], input[type="email"], input[type="password"] {
    text-align: center;
    margin-bottom: 2vh;
  }

  // Limit the maximum width of all screens
  html {
    background-color: #eee;
    margin: 0 auto;
    // Over desktop
    @media (min-width: ${global.desktop.startPixels}px) {
      // Force a mobile like aspect ratio
      max-width: 60vh; // Force aspect ratio
    }
  }

  // Global styles
  body {
    font-family: 'Nunito', sans-serif;
    background-color: white;
    color: black;
    -webkit-font-smoothing: antialiased;
    max-width: ${global.mobile.endPixels}px;
    margin: 0 auto;
  }
`;



// Convert a decimal number to a roman numeral
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

// Convert given text size to a font size, for mobile
function calcMobileTextSize( size: number ) {
  return Math.round( size / 10 );
}

// Convert given text size to a font size, for desktop
function calcDesktopTextSize( size: number ) {
  return Math.round( size * 4 );
}

export {
  GlobalStyles,
  global,
  romanNumeralFromDecimal,
  calcMobileTextSize,
  calcDesktopTextSize,
};
