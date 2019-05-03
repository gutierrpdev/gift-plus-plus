import { GiftId } from '../../domain';

// ---------------------------------------------------
// ALL THE EVENTS IN THE SYSTEM SHOULD BE DEFINED HERE
// ---------------------------------------------------

export const appStartedEvent = () => ({
  name: 'app-started',
  payload: {
    // todo: define system vars to pass
    // systemVersion: Constants.systemVersion,
    // deviceYearClass: Constants.deviceYearClass,
    // deviceId: Constants.deviceId,
    // sessionId: Constants.sessionId,
    // platform: Constants.platform,
  },
});

// ----
// Auth
// ----

export const registrationAttemptedEvent = () => ({ name: 'registration-attempted' });

export const registrationSucceededEvent = () => ({ name: 'registration-succeeded' });
export const registrationFailedEvent = () => ({ name: 'registration-failed' });

export const signInAttemptedEvent = () => ({ name: 'sign-in-attempted' });
export const signInSucceededEvent = () => ({ name: 'sign-in-succeeded' });
export const signInFailedEvent = () => ({ name: 'sign-in-failed' });

export const signOutAttemptedEvent = () => ({ name: 'sign-out-attempted' });
export const signOutSucceededEvent = () => ({ name: 'sign-out-succeeded' });
export const signOutFailedEvent = () => ({ name: 'sign-out-failed' });


// -----------
// Home Screen
// -----------

export const viewHomeScreenEvent = () => ({ name: 'view-home-screen' });
export const viewReceivedGiftsTabEvent = () => ({ name: 'view-received-gifts-tab' });
export const viewSentGiftsTabEvent = () => ({ name: 'view-sent-gifts-tab' });

export const viewGiftClickedEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'view-gift-clicked',
  payload: { giftId },
});


// -------------
// Gift Creation
// -------------

// export const newGiftStartedEvent = ({ giftId }) => ({
//   name: 'new-gift-started',
//   payload: { giftId },
// });

// export const existingGiftContinuedEvent = ({ giftId }) => ({
//   name: 'existing-gift-continued',
//   payload: { giftId },
// });

// export const giftAbandonedEvent = ({ giftId }) => ({
//   name: 'gift-abandoned',
//   payload: { giftId },
// });

// export const giftSavedForLaterEvent = ({ giftId }) => ({
//   name: 'gift-saved-for-later',
//   payload: { giftId },
// });

// export const viewSendingGiftPanelEvent = ({ giftId, panelName }) => ({
//   name: 'view-sending-gift-panel',
//   payload: { giftId, panelName },
// });

// // When a recipient name / email for the gift is entered
// export const giftRecipientEnteredEvent = ({ giftId }) => ({
//   name: 'gift-recipient-entered',
//   payload: { giftId },
// });

// // partNumber: 1 | 2 | 3
// // nextStep: 'wrap-up' | 'add-more' | null
// export const giftPartCompletedEvent = ({ giftId, partNumber, nextStep }) => ({
//   name: 'gift-part-completed',
//   payload: { giftId, partNumber, nextStep },
// });

// export const giftSongEnteredEvent = ({ giftId, songText }) => ({
//   name: 'gift-song-entered',
//   payload: { giftId, songText },
// });

// export const savingGiftAttemptedEvent = ({ giftId }) => ({
//   name: 'saving-gift-attempted',
//   payload: { giftId },
// });
// export const savingGiftSucceededEvent = ({ giftId }) => ({
//   name: 'saving-gift-succeeded',
//   payload: { giftId },
// });
// export const savingGiftFailedEvent = ({ giftId }) => ({
//   name: 'saving-gift-failed',
//   payload: { giftId },
// });

// export const giftCompleteGoHomePressedEvent = ({ giftId }) => ({
//   name: 'gift-complete-go-home-pressed',
//   payload: { giftId },
// });


// // --------------
// // Gift Receiving
// // --------------

// export const viewReceivingGiftPanelEvent = ({ giftId, panelName }) => ({
//   name: 'view-receiving-gift-panel',
//   payload: { giftId, panelName },
// });

// export const receivingGiftSaveForLaterEvent = ({ giftId }) => ({
//   name: 'receiving-gift-save-for-later',
//   payload: { giftId },
// });

// export const receivingGiftOpenItNowEvent = ({ giftId }) => ({
//   name: 'receiving-gift-open-it-now',
//   payload: { giftId },
// });

// // location: 'at-museum' | 'somewhere-else'
// export const receivingGiftLocationSelectedEvent = ({ giftId, location }) => ({
//   name: 'receiving-gift-location-selected',
//   payload: { giftId, location },
// });

// export const receivingGiftClueRequestedEvent = ({ giftId, partNumber }) => ({
//   name: 'receiving-gift-clue-requested',
//   payload: { giftId, partNumber },
// });

// export const receivingGiftFoundPartEvent = ({ giftId, partNumber }) => ({
//   name: 'receiving-gift-found-part',
//   payload: { giftId, partNumber },
// });

// export const savingGiftResponseAttemptedEvent = ({ giftId }) => ({
//   name: 'saving-gift-response-attempted',
//   payload: { giftId },
// });

// export const savingGiftResponseSucceededEvent = ({ giftId }) => ({
//   name: 'saving-gift-response-succeeded',
//   payload: { giftId },
// });

// export const savingGiftResponseFailedEvent = ({ giftId }) => ({
//   name:'saving-gift-response-failed',
//   payload: { giftId },
// });

// export const giftSongSearchedForEvent = ({ giftId }) => ({
//   name: 'gift-song-searched-for',
//   payload: { giftId },
// });

// export const giftReceiveCompleteGoHomePressedEvent = ({ giftId }) => ({
//   name: 'gift-receive-complete-go-home-pressed',
//   payload: { giftId },
// });


// // -----
// // Audio
// // -----

// export const audioPlayingEvent = ({ giftId, audioType }) => ({
//   name: 'audio-playing',
//   payload: { giftId, audioType },
// });

// export const audioPausedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-paused',
//   payload: { giftId, audioType },
// });

// export const audioStoppedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-stopped',
//   payload: { giftId, audioType },
// });

// export const audioRecordingStartedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-recording-started',
//   payload: { giftId, audioType },
// });

// export const audioRecordingStoppedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-recording-stopped',
//   payload: { giftId, audioType },
// });

// export const audioReRecordedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-re-recorded',
//   payload: { giftId, audioType },
// });

// export const audioKeptEvent = ({ giftId, audioType }) => ({
//   name: 'audio-kept',
//   payload: { giftId, audioType },
// });

// // -----
// // Photo
// // -----

// export const photoTakenEvent = ({ giftId, photoType }) => ({
//   name: 'photo-taken',
//   payload: { giftId, photoType },
// });

// export const photoKeepEvent = ({ giftId, photoType }) => ({
//   name: 'photo-keep',
//   payload: { giftId, photoType },
// });

// export const photoRetakeEvent = ({ giftId, photoType }) => ({
//   name: 'photo-retake',
//   payload: { giftId, photoType },
// });
