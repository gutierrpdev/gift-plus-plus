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

export const cPartStartedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-started', payload: { giftId, partNumber } });
export const cPartPhotoCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-photo-completed', payload: { giftId, partNumber } });
export const cPartNoteCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-note-completed', payload: { giftId, partNumber } });
export const cPartClueSkippedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-clue-skipped', payload: { giftId, partNumber } });
export const cPartClueCancelledEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-clue-cancelled', payload: { giftId, partNumber } });
export const cPartClueCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-clue-completed', payload: { giftId, partNumber } });
export const cPartCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-completed', payload: { giftId, partNumber } });

export const cSigningCompletedEvent = (giftId: string) => ({ name: 'c-signing-completed', payload: { giftId } });

export const cSavingAttemptedEvent = (giftId: string) => ({ name: 'c-saving-attempted', payload: { giftId } });
export const cSavingSucceededEvent = (giftId: string) => ({ name: 'c-saving-succeeded', payload: { giftId } });
export const cSavingFailedEvent = (giftId: string, reason: string) => ({ name: 'c-saving-failed', payload: { giftId, reason } });
export const cSavingRetriedEvent = (giftId: string) => ({ name: 'c-saving-retried', payload: { giftId } });

export const cSharingChannelChosenEvent = (giftId: string, channel: string) => ({ name: 'c-sharing-channel-chosen', payload: { giftId, channel } });
export const cSharingCompletedEvent = (giftId: string) => ({ name: 'c-sharing-completed', payload: { giftId } });
