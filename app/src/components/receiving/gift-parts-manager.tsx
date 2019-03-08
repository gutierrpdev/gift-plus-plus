import React, { useState } from 'react';
import styled from 'styled-components';

import { assertNever } from '../../utils/helpers';
import { Gift, GiftPart } from '../../domain';
import { romanNumeralFromDecimal } from '../../themes/global';

import { GiftPartWrapper } from './gift-part-wrapper';
import { IdleGiftPart } from './idle-gift-part';
import { RecipientLocation } from '../receiving/panels/choose-location';

/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
 */

const StyledGiftPartsManager = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;


interface Props {
  gift: Gift;
  recipientLocation: RecipientLocation;
}

interface State {
  status: ManagerStatus;
  partStateMap: Map<GiftPart, GiftPartState>;
}

type ManagerStatus =
  | { kind: 'ShowingAllParts' }
  | { kind: 'OnePartOpen', activePart: GiftPart };

interface GiftPartState {
  isDisabled: boolean;
}


/**
 * Create a fresh new GiftPartsManagerState based on the provided gift.
 */
function mkState(gift: Gift): State {
  const partStateMap = new Map<GiftPart, GiftPartState>();

  gift.parts.forEach((part) => {
    partStateMap.set(part, {
      isDisabled: true,
    });
  });

  return {
    status: { kind: 'ShowingAllParts' },
    partStateMap,
  };
}


const GiftPartsManager: React.FC<Props> = ({ gift, recipientLocation }) => {
  const [state, setState] = useState(() => mkState(gift));


  if (state.status.kind === 'ShowingAllParts') {
    return (
      <StyledGiftPartsManager>
        {gift.parts.map((part, idx) => {
          const partState = state.partStateMap.get(part)!;

          return (
            <IdleGiftPart
              key={idx}
              part={part}
              displaySize={'medium'}
              isDisabled={partState.isDisabled}
              onClick={() => setState({
                ...state,
                status: { kind: 'OnePartOpen', activePart: part },
              })}
            />
          );
        })}
      </StyledGiftPartsManager>
    );
  }


  if (state.status.kind === 'OnePartOpen') {
    const activePart = state.status.activePart;

    return (
      <StyledGiftPartsManager>
        {gift.parts.map((part, idx) => {
          const partState = state.partStateMap.get(part)!;

          if (part === activePart) {
            return (
              <GiftPartWrapper
                key={idx}
                gift={gift}
                giftPart={part}
                recipientLocation={recipientLocation}
                onComplete={() => { alert('TODO'); }} // next

                giftPartIndex={idx} // required?
                status={'Open'} // not need as wrapper always one things and open, other status for idle below
                canOpen={true} // remove
              />
            );
          }

          return (
            <IdleGiftPart
              key={idx}
              part={part}
              displaySize={'small'}
              isDisabled={partState.isDisabled}
              onClick={() => setState({
                ...state,
                status: { kind: 'OnePartOpen', activePart: part },
              })}
            >
              Part {romanNumeralFromDecimal(idx + 1)}
            </IdleGiftPart>
          );
        })}
      </StyledGiftPartsManager>
    );
  }

  return assertNever(state.status);
};

export {
  GiftPartsManager,
};
