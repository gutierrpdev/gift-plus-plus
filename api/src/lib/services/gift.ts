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
