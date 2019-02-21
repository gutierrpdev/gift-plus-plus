/**
 * The Api is responsible for all communication with the Gift Api.
 *
 * TODO: Do we really want to use errors?
 * TODO: Parsing
 */
export class Api {

  /**
   *
   */
  public constructor(
    private apiUrl: string,
  ) {}

  /**
   *
   */
  public async getGift(giftId: string): Promise<{}> {
    const url = `${this.apiUrl}/gift/${giftId}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('TODO');
    return res.json() as Gift;
  }
}
