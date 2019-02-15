/**
 * The Api is responsible for all communication with the Gift Api.
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
    await fetch(url);
    await new Promise((res) => setTimeout(res, 1000));
    return {};
  }
}
