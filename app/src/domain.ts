// TODO: Decide best way of code sharing for domain objects api/app. Maybe just
// do it through types provided by a ClientApi library. This defines the app's
// view of the domain. There's no reason the internal representation in the
// paltform/api should correspond to it's external interface, so we shouldn't
// couple them.

type Id = string;
type MuseumId = Id;
type AccountId = Id;
type GiftId = Id;
type PhotoUrl = string;
type AudioRecordingUrl = string;

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