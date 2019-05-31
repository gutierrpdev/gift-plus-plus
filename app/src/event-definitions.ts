// tslint:disable max-line-length

// ---------------------------------------------------
// ALL THE EVENTS IN THE SYSTEM SHOULD BE DEFINED HERE
// ---------------------------------------------------

export const appStartedEvent = () => ({ name: 'app-started', payload: {
  userAgent: (navigator || window.navigator || {}).userAgent,
}});

export const termsAcceptedEvent = () => ({ name: 'terms-accepted' });


// ----
// Home
// ----

export const hIntroStartedEvent = () => ({ name: 'h-intro-started' });
export const hAtMuseumConfirmedEvent = (atMuseum: boolean) => ({ name: 'h-at-museum-confirmed', payload: { atMuseum } });
export const hShowMuseumGiftPressedEvent = () => ({ name: 'h-show-museum-gift-pressed' });
export const hCreateOwnPressedEvent = () => ({ name: 'h-create-own-pressed' });
export const hCreatePressedEvent = () => ({ name: 'h-create-pressed' });
export const hMorePressedEvent = () => ({ name: 'h-more-pressed' });
export const hGiftsCreatePressedEvent = () => ({ name: 'h-gifts-create-pressed' });
export const hGiftsOpenMuseumGiftPressedEvent = () => ({ name: 'h-gifts-open-museum-gift-pressed' });


// ---------
// Receiving
// ---------

export const rOpenPressedEvent = (giftId: string) => ({ name: 'r-open-pressed', payload: { giftId } });
export const rAtMuseumConfirmedEvent = (atMuseum: boolean) => ({ name: 'h-at-museum-confirmed', payload: { atMuseum } });


// --------
// Creating
// --------

// Custom
export const cNewGiftStartedEvent = (giftId: string) => ({ name: 'c-new-gift-started', payload: { giftId } });
export const cIntroCompletedEvent = (giftId: string) => ({ name: 'c-intro-completed', payload: { giftId } });
export const cRecipientNameEnteredEvent = (giftId: string) => ({ name: 'c-recipient-name-entered', payload: { giftId } });

export const cSigningCompletedEvent = (giftId: string) => ({ name: 'c-signing-completed', payload: { giftId } });
export const cSharingCompletedEvent = (giftId: string) => ({ name: 'c-sharing-completed', payload: { giftId } });
