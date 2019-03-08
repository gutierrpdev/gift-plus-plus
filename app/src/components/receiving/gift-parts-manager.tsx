import React, { useState } from 'react';
import styled from 'styled-components';

import { assertNever } from '../../utils/helpers';
import { Gift, GiftPart } from '../../domain';

import { GiftPartWrapper } from './gift-part-wrapper';
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
  | { kind: 'OnePartOpen', activePart: GiftPart }
  | { kind: 'ShowingResponse' };

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


export const GiftPartsManager: React.FC<Props> = ({ gift, recipientLocation }) => {
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

    const handlePartComplete = (part: GiftPart) => {
      const nextPart = nextGiftPart(gift, part);

      if (nextPart) {
        setState({
          ...state,
          status: { kind: 'OnePartOpen', activePart: nextPart },
        });
      } else {
        setState({
          ...state,
          status: { kind: 'ShowingResponse' },
        });
      }
    };

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
                onComplete={() => handlePartComplete(part)}

                giftPartIndex={idx}
                status={'Open'}
                canOpen={true}
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
            />
          );
        })}
      </StyledGiftPartsManager>
    );
  }

  if (state.status.kind === 'ShowingResponse') {
    return (
      <StyledGiftPartsManager>
        <h1>TODO: Respond to gift</h1>
      </StyledGiftPartsManager>
    );
  }

  return assertNever(state.status);
};


/**
 * Find the part after the given one for the given gift.
 *
 * Returns `null` if there are no more parts in the gift.
 */
function nextGiftPart(gift: Gift, currentPart: GiftPart): GiftPart | null {
  for (let i = 0; i < gift.parts.length; i++) {
    if (gift.parts[i] !== currentPart) continue;
    return gift.parts[i + 1] || null;
  }
  return null;
}


interface IdleGiftPartProps {
  part: GiftPart;
  displaySize: 'small' | 'medium';
  isDisabled: boolean;
  onClick: () => void;
}

const IdleGiftPart: React.FC<IdleGiftPartProps> = (props) => {
  return (
    <button onClick={props.onClick} >
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </button>
  );
};
