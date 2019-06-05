/**
 * This module contains domain specifc functions for interacting with the local
 * storage.  (Persistent across reloads.)
 */

import uuidv5 from 'uuid/v5';

import { getLocalItem, setLocalItem, getSessionItem, setSessionItem } from './storage';
import { RecipientLocation } from '../components/choose-location';
import { Gift } from '../domain';


// HasSeenHomeIntro
export function getHasSeenHomeIntro(): boolean {
  return !!getLocalItem<boolean>('hasSeenHomeIntro');
}
export function setHasSeenHomeIntro(hasSeen: boolean): void {
  setLocalItem('hasSeenHomeIntro', hasSeen);
}

// HasUnopenedMuseumGift
export function getHasUnopenedMuseumGift(): boolean {
  // Default to true
  return getLocalItem<boolean>('hasUnopenedMuseumGift') === undefined
    ? true
    : !!getLocalItem<boolean>('hasUnopenedMuseumGift');
}
export function setHasUnopenedMuseumGift(opened: boolean): void {
  setLocalItem('hasUnopenedMuseumGift', opened);
}

// SessionRecipientLocation
export function getSessionRecipientLocation(): RecipientLocation {
  // Default to unknown
  return getSessionItem<RecipientLocation>('recipientLocation') || 'unknown';
}
export function setSessionRecipientLocation(recipientLocation: RecipientLocation): void {
  setSessionItem('recipientLocation', recipientLocation);
}

// User has agreed terms
export function getUserHasAgreedTerms(): boolean {
  return !!getLocalItem<boolean>('userHasAgreedTerms');
}
export function setUserHasAgreedTerms(): void {
  setLocalItem('userHasAgreedTerms', true);
}

// ## Sent and received gifts ##
export function getSentGifts(): Gift[] {

  // todo: replace this with actual stored gifts
  /* tslint:disable max-line-length */
  const gift: Gift = {
    id: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
    kind: 'MuseumGift',
    museumId: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
    senderName: 'Brighton Museum',
    recipientName: 'visitor',
    parts: [
      {
        photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-photo.6046a68f.jpg',
        note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-note.c4ff803e.m4a',
        clue: 'Find the cabinet of Japanese inspired furniture',
      },
      {
        photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-photo.863ba708.jpg',
        note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-note.cd932aee.m4a',
        clue: 'Look among the chairs by the  entrance',
      },
      {
        photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-photo.819aeecd.jpg',
        note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-note.2ea33504.m4a',
        clue: 'Search for the glass case of figurines',
      },
    ],
  };
  /* tslint:enable max-line-length */

  const gifts = [
    gift,
    gift,
    gift,
    gift,
  ];

  return gifts;
}

export function getReceivedGifts(): Gift[] {
  return getSentGifts();
}
