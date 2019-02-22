type Id = string;
type MuseumId = Id;
type AccountId = Id;
type GiftId = Id;
type GiftShareId = Id;
type PhotoUrl = string;
type AudioRecordingUrl = string;


interface Gift {
  id: GiftId;
  kind: 'MuseumGift' | 'PersonalGift';
  museumId: MuseumId;
  accountId: AccountId;
  senderName: string;
  recipientName: string;
  recipientGreeting: AudioRecordingUrl;
  parts: GiftPart[];
}


interface GiftPart {
  photo: PhotoUrl;
  note: AudioRecordingUrl;
  clue: string;
}


interface Museum {
  id: MuseumId;
  name: string;
  appAssets: {};
}


interface Account {
  id: AccountId;
  name: string;
  email: string;
}


interface GiftShare {
  id: GiftShareId;
  giftId: GiftId;
  accountId: AccountId;
}


interface GiftReciept {
  giftShareId: GiftShareId;
  accountId: AccountId;
}


interface GiftResponse {
  giftShareId: GiftShareId;
  accountId: AccountId;
  response: AudioRecordingUrl;
}
