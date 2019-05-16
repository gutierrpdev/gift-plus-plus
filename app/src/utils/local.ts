/**
 * This module contains domain specifc functions for interacting with the local
 * storage.  (Persistent across reloads.)
 */

import { setPrefix, getLocalItem, setLocalItem, getSessionItem, setSessionItem } from './storage';
import { RecipientLocation } from '../components/choose-location';

// Cache-busting prefix for different versions
setPrefix('v1'); // todo : this should probably come from the config

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
