/**
 * Domain
 *
 * This file defines the app's view of the domain. This is considered distinct
 * from the platform/api and should not be directly coupled.
 */

export type Id = string;
export type MuseumId = Id;
export type AccountId = Id;
export type GiftId = Id;
export type PhotoUrl = string;
export type AudioRecordingUrl = string;

export interface LocalFile {
  url: string;
  mimeType: string;
}

export interface GiftPart {
  photo: PhotoUrl;
  note: AudioRecordingUrl;
  clue: string;
}

export interface Gift {
  id: GiftId;
  kind: 'MuseumGift' | 'PersonalGift';
  museumId: MuseumId;
  accountId: AccountId;
  senderName: string;
  recipientName: string;
  recipientGreeting: AudioRecordingUrl;
  parts: GiftPart[];
}


export interface InProgressGiftPart {
  photo: LocalFile;
  note: LocalFile;
  clue: string;
}

export interface InProgressGift {
  id: GiftId;
  museumId: MuseumId;
  senderName?: string;
  recipientName?: string;
  recipientGreeting?: LocalFile;
  parts: InProgressGiftPart[];
}
