// tslint:disable max-line-length

// ---------------------------------------------------
// ALL THE EVENTS IN THE SYSTEM SHOULD BE DEFINED HERE
// ---------------------------------------------------

// ------
// System
// ------

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

// Start
export const rOpenPressedEvent = (giftId: string) => ({ name: 'r-open-pressed', payload: { giftId } });
export const rAtMuseumConfirmedEvent = (giftId: string, atMuseum: boolean) => ({ name: 'r-at-museum-confirmed', payload: { giftId, atMuseum } });
// Parts
export const rOpenPartPressedEvent = (giftId: string, partNumber: number)  => ({ name: 'r-open-part-pressed', payload: { giftId, partNumber } });
// Part clue
export const rPartCluePressedEvent = (giftId: string, partNumber: number) => ({ name: 'r-part-clue-pressed', payload: { giftId, partNumber } });
export const rPartClueDismissedEvent = (giftId: string, partNumber: number) => ({ name: 'r-part-clue-dismissed', payload: { giftId, partNumber } });
export const rPartHelpPressedEvent = (giftId: string, partNumber: number) => ({ name: 'r-part-help-pressed', payload: { giftId, partNumber } });
export const rPartHelpDismissedEvent = (giftId: string, partNumber: number) => ({ name: 'r-part-help-dismissed', payload: { giftId, partNumber } });
export const rPartCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'r-part-completed', payload: { giftId, partNumber } });
// Part End
export const rPartFound = (giftId: string, partNumber: number) => ({ name: 'r-part-found', payload: { giftId, partNumber } });
// End
export const rOutroCompletedEvent = (giftId: string) => ({ name: 'r-outro-completed', payload: { giftId } });





// --------
// Creating
// --------

export const cNewGiftStartedEvent = (giftId: string) => ({ name: 'c-new-gift-started', payload: { giftId } });
export const cIntroCompletedEvent = (giftId: string) => ({ name: 'c-intro-completed', payload: { giftId } });
export const cRecipientNameEnteredEvent = (giftId: string) => ({ name: 'c-recipient-name-entered', payload: { giftId } });

export const cPartStartedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-started', payload: { giftId, partNumber } });
export const cPartPhotoCompletedEvent = (giftId: string, partNumber: number) => ({ name: 'c-part-photo-completed', payload: { giftId, partNumber } });
export const cPartMessageRecordStarted = (giftId: string, partNumber: number) => ({ name: 'c-part-message-record-started', payload: { giftId, partNumber } });
export const cPartMessageRecordStopped = (giftId: string, partNumber: number) => ({ name: 'c-part-message-record-stopped', payload: { giftId, partNumber } });
export const cPartMessageReRecordPressed = (giftId: string, partNumber: number) => ({ name: 'c-part-message-re-record-pressed', payload: { giftId, partNumber } });
export const cPartMessageCompleted = (giftId: string, partNumber: number) => ({ name: 'c-part-message-completed', payload: { giftId, partNumber } });

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

export const cOutroCompletedEvent = (giftId: string) => ({ name: 'r-outro-completed', payload: { giftId } });


// ------------
// Audio Player
// ------------

export const aPlayerPlayPressedEvent = (giftId: string, audioFilename: string) => ({ name: 'audio-player-play-pressed', payload: { giftId, audioFilename } });
export const aPlayerPausePressedEvent = (giftId: string, audioFilename: string) => ({ name: 'audio-player-pause-pressed', payload: { giftId, audioFilename } });
export const aPlayerSkipPressedEvent = (giftId: string, audioFilename: string) => ({ name: 'audio-player-skip-pressed', payload: { giftId, audioFilename } });
export const aPlayerStepBackwardsPressedEvent = (giftId: string, audioFilename: string) => ({ name: 'audio-player-step-backwards-pressed', payload: { giftId, audioFilename } });
export const aPlayerAudioCompletedEvent = (giftId: string, audioFilename: string) => ({ name: 'audio-player-audio-completed', payload: { giftId, audioFilename } });
