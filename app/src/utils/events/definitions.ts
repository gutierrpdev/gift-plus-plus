import { GiftId } from '../../domain';
import { CreateGiftNextStep } from '../../components/creating/part-content';

// todo: delete the unused events in here

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

export const newGiftStartedEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'new-gift-started',
  payload: { giftId },
});

// delete - we dont have this now
// export const existingGiftContinuedEvent = ( { giftId }: {giftId: GiftId } ) => ({
//   name: 'existing-gift-continued',
//   payload: { giftId },
// });

// todo: not sure how in terms of JS tech?  On callback on leave tab
// export const giftAbandonedEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'gift-abandoned',
//   payload: { giftId },
// });

// we dont have this now
// delete -  double check we don't have this
// export const giftSavedForLaterEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'gift-saved-for-later',
//   payload: { giftId },
// });

// todo, do we want this?
// export const viewSendingGiftPanelEvent = ({ giftId, panelName }) => ({
//   name: 'view-sending-gift-panel',
//   payload: { giftId, panelName },
// });

// When a recipient name / email for the gift is entered
export const giftRecipientEnteredEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'gift-recipient-entered',
  payload: { giftId },
});

// partNumber: 1 | 2 | 3
// nextStep: 'wrap-up' | 'add-more' | null
export const giftPartCompletedEvent = (
    { giftId, partNumber, nextStep }: { giftId: GiftId, partNumber: number, nextStep: CreateGiftNextStep },
  ) => ({
  name: 'gift-part-completed',
  payload: { giftId, partNumber, nextStep },
});

export const savingGiftAttemptedEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'saving-gift-attempted',
  payload: { giftId },
});
export const savingGiftSucceededEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'saving-gift-succeeded',
  payload: { giftId },
});
export const savingGiftFailedEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'saving-gift-failed',
  payload: { giftId },
});

// Potential new events
// giftShareClicked
// giftMenuItemClicked

// we dont have this now, todo but check for alternative
// export const giftCompleteGoHomePressedEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'gift-complete-go-home-pressed',
//   payload: { giftId },
// });


// --------------
// Gift Receiving
// --------------

// todo, do we want this?
// export const viewReceivingGiftPanelEvent = ({ giftId, panelName }) => ({
//   name: 'view-receiving-gift-panel',
//   payload: { giftId, panelName },
// });

export const receivingGiftSaveForLaterEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'receiving-gift-save-for-later',
  payload: { giftId },
});

export const receivingGiftOpenItNowEvent = ( { giftId }: {giftId: GiftId } ) => ({
  name: 'receiving-gift-open-it-now',
  payload: { giftId },
});

// location: 'at-museum' | 'somewhere-else'
export const receivingGiftLocationSelectedEvent = ({ giftId, location }: { giftId: GiftId, location: string }) => ({
  name: 'receiving-gift-location-selected',
  payload: { giftId, location },
});

export const receivingGiftClueRequestedEvent = ({ giftId, partNumber }: { giftId: GiftId, partNumber: number }) => ({
  name: 'receiving-gift-clue-requested',
  payload: { giftId, partNumber },
});

export const receivingGiftFoundPartEvent = ({ giftId, partNumber }: { giftId: GiftId, partNumber: number }) => ({
  name: 'receiving-gift-found-part',
  payload: { giftId, partNumber },
});

// todo review need for response events
// export const savingGiftResponseAttemptedEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'saving-gift-response-attempted',
//   payload: { giftId },
// });

// export const savingGiftResponseSucceededEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'saving-gift-response-succeeded',
//   payload: { giftId },
// });

// export const savingGiftResponseFailedEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name:'saving-gift-response-failed',
//   payload: { giftId },
// });

// todo review an alternaive for this, TBD
// export const giftReceiveCompleteGoHomePressedEvent = ( { giftId }: {giftId: GiftId } )=> ({
//   name: 'gift-receive-complete-go-home-pressed',
//   payload: { giftId },
// });


// -----
// Audio
// -----

// Note: audioType is a unique identifier for the panel, etc.
export const audioPlayingEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-playing',
  payload: { giftId, audioType },
});

export const audioPausedEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-paused',
  payload: { giftId, audioType },
});

// No stop now
// export const audioStoppedEvent = ({ giftId, audioType }) => ({
//   name: 'audio-stopped',
//   payload: { giftId, audioType },
// });

export const audioRecordingStartedEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-recording-started',
  payload: { giftId, audioType },
});

export const audioRecordingStoppedEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-recording-stopped',
  payload: { giftId, audioType },
});

export const audioReRecordedEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-re-recorded',
  payload: { giftId, audioType },
});

export const audioKeptEvent = ({ giftId, audioType }: { giftId: GiftId, audioType: string }) => ({
  name: 'audio-kept',
  payload: { giftId, audioType },
});

// -----
// Photo
// -----

// Note: photoType is a unique identifier for the panel/function, etc.
export const photoTakenEvent = ({ giftId, photoType }: { giftId: GiftId, photoType: string }) => ({
  name: 'photo-taken',
  payload: { giftId, photoType },
});


// note: These are no longer used as we have no feedback from the phone internal camera UI
// export const photoKeepEvent = ({ giftId, photoType }: { giftId: GiftId, photoType: string }) => ({
//   name: 'photo-keep',
//   payload: { giftId, photoType },
// });

// export const photoRetakeEvent = ({ giftId, photoType} : { giftId: GiftId, photoType: string }) => ({
//   name: 'photo-retake',
//   payload: { giftId, photoType },
// });
