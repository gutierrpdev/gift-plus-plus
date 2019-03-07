import * as uuidv5 from 'uuid/v5';
import * as Knex from 'knex';

type Id = string;
type MuseumId = Id;
type AccountId = Id;
type GiftId = Id;
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


/**
 * TODO
 *
 *
 */
export class GiftService {

  constructor(
    private db: Knex,
  ) {}


  /**
   * Store a new gift.
   *
   * @param gift
   */
  public async create(gift: Gift): Promise<GiftCreateResult> {
    // TODO: Transaction
    const [{ count }]: CountQueryResult = await this.db('gift').where({ id: gift.id }).count('id as count');

    if (count !== 0) {
      return { kind: 'IdAlreadyExists' };
    }

    await this.db('gift').insert({
      id: gift.id,
      kind: gift.kind,
      museum_id: gift.museumId,
      account_id: gift.accountId,
      sender_name: gift.senderName,
      recipient_name: gift.recipientName,
      recipient_greeting: gift.recipientGreeting,
      parts: JSON.stringify(gift.parts),
    });

    return { kind: 'Success' };
  }


  /**
   * Retrieve a gift by id.
   *
   * @param id
   */
  public async findById(id: GiftId): Promise<Gift | null> {
    // TEMP: Use hardcoded values
    if (hardcodedGifts.has(id)) return hardcodedGifts.get(id)!;

    return this.findByIds([id]).then((gifts) => gifts.length === 0 ? null : gifts[0]);
  }


  /**
   * Retrieve multiple gifts by id.
   *
   * This function is not guaranteed to return gifts in any particular order.
   * You should NOT rely on a correspondence between the input id array and the
   * output gift array.
   *
   * @param ids
   */
  public async findByIds(ids: [GiftId]): Promise<Gift[]> {
    const rows: GiftTableRow[] = await this.db('gift').whereIn('id', ids);
    return rows.map(tableRowToGift);
  }
}


// -------
// Helpers
// -------

type GiftCreateResult =
  | { kind: 'Success' }
  | { kind: 'IdAlreadyExists' }
;


type CountQueryResult = [ { count: number } ];

interface GiftTableRow {
  id: string;
  kind: 'MuseumGift' | 'PersonalGift';
  museum_id: string;
  account_id: string;
  sender_name: string;
  recipient_name: string;
  recipient_greeting: string;
  parts: string;
  created_at: Date;
}

function tableRowToGift(row: GiftTableRow): Gift {
  // TODO: Should we validate the gift structure and integrity? Ensure the
  // payload is always the right shape and matches the table ids etc? Throw an
  // error if not to avoid hard to trace bugs.
  //
  // Gifts are intended to be immutable, so this shouldn't be neccessary. But it
  // could be an issue if we have a programmer / operational mistake.

  return {
    id: row.id,
    kind: row.kind,
    museumId: row.museum_id,
    accountId: row.account_id,
    senderName: row.sender_name,
    recipientName: row.recipient_name,
    recipientGreeting: row.recipient_greeting,
    parts: JSON.parse(row.parts),
  };
}


/* tslint:disable max-line-length */
const hardcodedGifts = new Map<GiftId, Gift>();

// 5475400c-684c-515f-8343-b9d14340de9c
hardcodedGifts.set(uuidv5('https://api.gift.com/gift/test-1', uuidv5.URL), {
  id: uuidv5('https://api.gift.com/gift/test-1', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test-1', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test-1', uuidv5.URL),
  senderName: 'The sender name',
  recipientName: 'The recipient name',
  recipientGreeting: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-recipientName.m4a',
  parts: [
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part1-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part1-clue.m4a',
      clue: 'Part 1 clue',
    },
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part2-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part2-clue.m4a',
      clue: 'Part 2 clue',
    },
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part3-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part3-clue.m4a',
      clue: 'Part 3 clue',
    },
  ],
});
/* tslint:enable max-line-length */
