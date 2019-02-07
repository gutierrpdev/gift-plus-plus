import * as React from 'react';
//import styled from 'styled-components/macro';
import { Gift } from '../domain';

interface Props {
  gifts: Gift[],
};

const GiftPile: React.FC<Props> = ({ gifts }: Props) => (
  <>
    {gifts.map((gift, index) => (
      <div key={index}>
      <p>{gift.senderName}</p>
      <img src={gift.parts[0].photo} />
      </div>
    ))}
  </>
);

export default GiftPile;


// export default class GiftPile extends React.Component<any, any> {
// export class GiftPile extends React.Component<Props, State> (

//   public render() {
//     return (
//   }

// }
