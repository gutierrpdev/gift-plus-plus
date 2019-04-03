import * as React from 'react';

const SvgButtonAudioSkip = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 60 60' {...props}>
    <circle cx={30} cy={30} r={30} />
    <path
      // tslint:disable-next-line
      d='M36.08 18.3v10.34L18.91 18.16a.6.6 0 0 0-.91.51v22.66a.6.6 0 0 0 .91.51l17.17-10.47V41.7a.29.29 0 0 0 .3.3h5.32a.29.29 0 0 0 .3-.3V18.3a.3.3 0 0 0-.3-.3h-5.32a.3.3 0 0 0-.3.3z'
      fill='#999'
    />
  </svg>
);

export default SvgButtonAudioSkip;
