/**
 * This module contains domain specifc functions for interacting with the local
 * storage.  (Persistent across reloads.)
 */

import { setPrefix, getLocalItem, setLocalItem, getSessionItem, setSessionItem } from './storage';
import { RecipientLocation } from '../components/choose-location';

// Cache-busting prefix for different versions
setPrefix('1'); // todo : this should probably come from the config

export function getHasSeenHomeIntro(): boolean {
  return !!getLocalItem<boolean>('hasSeenHomeIntro');
}

export function setHasSeenHomeIntro(hasSeen: boolean): void {
  setLocalItem('hasSeenHomeIntro', hasSeen);
}

export function getHasSeenHomeHowAbout(): boolean {
  return !!getLocalItem<boolean>('hasSeenHomeHowAbout');
}

export function setHasSeenHomeHowAbout(hasSeen: boolean): void {
  setLocalItem('hasSeenHomeHowAbout', hasSeen);
}

export function getSessionRecipientLocation(): RecipientLocation {
  // Default to unknown
  return getSessionItem<RecipientLocation>('recipientLocation') || 'unknown';
}

export function setSessionRecipientLocation(recipientLocation: RecipientLocation): void {
  setSessionItem('recipientLocation', recipientLocation);
}
