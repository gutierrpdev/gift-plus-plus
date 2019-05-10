/* tslint:disable */
import * as React from "react";

interface Props {
  colour: string;
}

const SvgGift = (props: Props) => (
  <svg viewBox="-10 -5 120 110">
    <path fill={props.colour} d="M90 20.1h-9.12A15 15 0 0 0 66.8.1a15 15 0 0 0-3.89.5 14.84 14.84 0 0 0-7.78 5L50 12.22 45 5.6A14.91 14.91 0 0 0 33.3 0a15 15 0 0 0-14.52 11.06 14.76 14.76 0 0 0 .39 9H10a10 10 0 0 0-10 10V90a10 10 0 0 0 10 10h80a10 10 0 0 0 10-10V30.09a10 10 0 0 0-10-9.99zm-24.53-9.9a5.26 5.26 0 0 1 1.3-.16A5 5 0 0 1 68 19.87a4.89 4.89 0 0 1-1.3.17H56.55l6.33-8.19a5 5 0 0 1 2.59-1.65zm-32.23 9.74a4.91 4.91 0 0 1-1.3-.18 5 5 0 0 1 1.33-9.82 5.26 5.26 0 0 1 1.29.17 5 5 0 0 1 2.58 1.68l6.3 8.27h-8.25c-.91-.06-1.65-.12-1.95-.12zM10 90.06v-60h26.19l-5.53 7.16-3.06 4 7-.9.9 7 3.06-4 6.5-8.41-.17 55.14zm80 0H54.91l.16-54.74 6.17 8.09 3 4 1-7 7 .95-3-4-5.56-7.29H90z" />
  </svg>
);

export default SvgGift;
