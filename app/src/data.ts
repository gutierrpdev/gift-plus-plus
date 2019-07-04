import uuidv5 from 'uuid/v5';
import { config } from './config';
import { Museum } from './domain';


/**
 * Brighton Museum
 *
 * ID: 95d5128f-e6b3-5b07-8c98-6c9876a27481
 */
const brighton: Museum = {
  id: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
  name: 'Brighton Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
  assets: {
    cChoosePart1: require('../assets/audio/c-choose-part-1.m4a') as string,
    cChoosePart2: require('../assets/audio/c-choose-part-2.m4a') as string,
    cChoosePart3: require('../assets/audio/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('../assets/audio/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('../assets/audio/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('../assets/audio/c-let-them-know-part-3.m4a') as string,
    cStart: require('../assets/audio/c-start-gift.m4a') as string,
    cShare: require('../assets/audio/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('../assets/audio/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('../assets/audio/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('../assets/audio/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('../assets/audio/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('../assets/audio/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('../assets/audio/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('../assets/audio/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('../assets/audio/r-outro-remote-personal.m4a') as string,
  },
};


/**
 * Munch Museum
 *
 * ID: dc640fed-634c-5a18-9580-a0a615403f62
 */
const munch: Museum = {
  id: uuidv5('https://api.thegift.app/museum/munch-museum', uuidv5.URL),
  name: 'Munch Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/munch-museum-1', uuidv5.URL),
  assets: {
    cChoosePart1: require('../assets/audio/c-choose-part-1.m4a') as string,
    cChoosePart2: require('../assets/audio/c-choose-part-2.m4a') as string,
    cChoosePart3: require('../assets/audio/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('../assets/audio/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('../assets/audio/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('../assets/audio/c-let-them-know-part-3.m4a') as string,
    cStart: require('../assets/audio/c-start-gift.m4a') as string,
    cShare: require('../assets/audio/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('../assets/audio/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('../assets/audio/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('../assets/audio/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('../assets/audio/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('../assets/audio/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('../assets/audio/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('../assets/audio/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('../assets/audio/r-outro-remote-personal.m4a') as string,
  },
};



function chooseMuesum(): Museum {
  // Overridded in config (DEV only!!)
  if (config.museumOverride === 'brighton') return brighton;
  if (config.museumOverride === 'munch') return munch;

  // Switch museum based on domain
  // TODO

  return brighton;
  throw new Error('App not setup for this museum');
}


export const museum = chooseMuesum();
