import Ajv from 'ajv';
import {
  CreateGiftRequest,
  CreateGiftResponse,
  createGiftResponseSchema,
  GetGiftResponse,
  getGiftResponseSchema,
} from '../common/api-schema';

// TEMP: Mock Data
import { mockGifts } from './mock';


// We re-export any types the Api is responsible for from here.
export type CreateGiftResponse = CreateGiftResponse;
export type GetGiftResponse = GetGiftResponse;

/**
 * The Api is responsible for all communication with the Gift Api.
 *
 * NOTE: We enforce the api contract by validating the data we receive back from
 * the api. This may be excessive but should mean any errors are surfaced
 * quickly.
 */
export class Api {

  public constructor(
    private apiUrl: string,
  ) {}


  public async getGift(giftId: string): Promise<ApiResult<GetGiftResponse>> {
    // TEMP: Mock Data
    if (mockGifts.has(giftId)) return { kind: 'ok', data: mockGifts.get(giftId)! };

    const url = `${this.apiUrl}/gift/${giftId}`;
    const request = new Request(url);
    return getApiResult<GetGiftResponse>(request, getGiftResponseSchema);
  }


  public async createGift(data: CreateGiftRequest): Promise<ApiResult<CreateGiftResponse>> {
    const url = `${this.apiUrl}/gift`;
    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return getApiResult<CreateGiftResponse>(request, createGiftResponseSchema);
  }
}


export type ApiResult<T> =
  | { kind: 'ok', data: T }
  | { kind: 'fetch-error', error: Error }
  | { kind: 'http-error', response: Response }
  | { kind: 'parse-error', errors: ParseError }
;


export type ParseError =
  | 'InvalidJson'
  | Ajv.ErrorObject[];


const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
});


/**
 * Run the given request and parse the response according to `schema`.
 *
 * This function is not expected to throw. Wraps all errors into the ApiResult.
 *
 * UNSAFE: We trust that the given schema does indeed only validate objects of
 * the given type T.  The caller MUST ensure that's the case.
 */
async function getApiResult<T>(request: Request, schema: {}): Promise<ApiResult<T>> {

  // Run the request
  let response: Response;
  try {
    response = await fetch(request);
  } catch (err) {
    return { kind: 'fetch-error', error: err };
  }

  // Check the response
  if (!response.ok) return { kind: 'http-error', response };

  let data;
  try {
    data = await response.json();
  } catch (err) {
    return { kind: 'parse-error', errors: 'InvalidJson' };
  }

  // Validate the response against our schema
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return { kind: 'parse-error', errors: (ajv.errors as Ajv.ErrorObject[]) };
  }

  // (unsafe type coercion)
  return { kind: 'ok', data: (data as T) };
}
