export interface GiftPart {
  note: string,
  photoUrl: string,
  audioUrl: string,
}


export interface Gift {
  kind: 'Gift',
  id: string,
  museumId: string,
  to: string,
  parts: GiftPart[],
}


export interface Account {
  kind: 'Account',
  id: string,
  email: string,
  name: string,
}


export interface Museum {
  kind: 'Museum',
  id: string,
  name: string,
}
