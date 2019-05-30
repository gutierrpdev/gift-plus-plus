

export type AppEvent =
  | OtherEvent
  | HomeEvent
;


type OtherEvent =
  | { name: 'app-started', payload: { userAgent: string } }
;


type HomeEvent =
  | { name: 'h-intro-started', payload: {} }
  | { name: 'h-at-museum-confirmed', payload: { atMuseum: boolean } }
  | { name: 'h-show-museum-gift-pressed', payload: {} }
  | { name: 'h-create-own-pressed', payload: {} }
  | { name: 'h-create-pressed', payload: {} }
  | { name: 'h-more-pressed', payload: {} }
  | { name: 'h-gifts-create-pressed', payload: {} }
  | { name: 'h-gifts-open-museum-gift-pressed', payload: {} }
;
