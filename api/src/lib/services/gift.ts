import * as Knex from 'knex';

interface Gift {
  id: string;
  to: string;
  parts: GiftPart[];
}

interface GiftPart {
  photo: string;
  recording: string;
}


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
    // TODO: Transaction, UUID validation
    const [{ count }]: CountQueryResult = await this.db('gift').where({ id: gift.id }).count();
    if (count !== '0') {
      return { kind: 'IdAlreadyExists' };
    }

    await this.db('gift').insert({
      id: gift.id,
      payload: {
        to: gift.to,
        parts: gift.parts,
      },
    });

    return { kind: 'Success' };
  }


  /**
   * Retrieve a gift by id.
   *
   * @param id
   */
  public async findById(id: string): Promise<Gift | null> {
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
  public async findByIds(ids: [string]): Promise<Gift[]> {
    // TODO: UUID validation
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


type CountQueryResult = [ { count: string } ];

interface GiftTableRow {
  id: string;
  payload: {
    to: string;
    parts: GiftPart[];
  };
  created_at: Date;
}


function tableRowToGift(row: GiftTableRow): Gift {
  return {
    id: row.id,
    to: row.payload.to,
    parts: row.payload.parts,
  };
}
