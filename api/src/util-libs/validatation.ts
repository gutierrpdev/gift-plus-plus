import * as Ajv from 'ajv';

const paramAjv = new Ajv({
  coerceTypes: true,
  allErrors: true,
  removeAdditional: true,
});

const queryAjv = new Ajv({
  coerceTypes: true,
  allErrors: true,
  removeAdditional: true,
});

const bodyAjv = new Ajv({
  allErrors: true,
  removeAdditional: true,
});


interface ParamSchema {
  [paramName: string]: {
    type: string;
    [opts: string]: any;
  };
}

export function validateParams<T>(
  schema: ParamSchema,
  ctx: any,
): T {
  const valid = paramAjv.validate(
    {
      properties: schema,
      required: Object.keys(schema),
    },
    ctx.params,
  );

  if (!valid) ctx.throw(400, { error: paramAjv.errorsText() });
  return ctx.params as T;
}


// const valid = ajv.validate({
//   properties: {
//     id: { type: 'number' },
//     hi: { type: 'boolean' },
//   },
//   required: ['id', 'hi'],
// }, ctx.params);



// type PropertyNamesUnion<T> = { [K in keyof T]: K }[keyof T];
// type PropertyNamesList<T> = [keyof T];

// interface ValidParams {
//   id: string;
//   num: number;
// }

// type VList = PropertyNamesList<ValidParams>;
// type VUnion = PropertyNamesUnion<ValidParams>;


// function v<ParamNames extends VList>(...parameterNames: ParamNames): { [P in VUnion]: ValidParams[P]; } {
//   throw new Error('Oh Dear');
// }

// const omg = v('id');

// function validate1<P1 extends keyof ValidParams>(p1: P1): Record<P1, ValidParams[P1]> {
//   throw new Error('Oh Dear');
// }

// function validate2<
//   P1 extends keyof ValidParams
// , P2 extends keyof ValidParams
//   >(p1: P1, p2: P2): Record<P1, ValidParams[P1]> & Record<P2, ValidParams[P2]> {
//   throw new Error('Oh Dear');
// }

// function validate3<
//   P1 extends keyof ValidParams
// , P2 extends keyof ValidParams
// , P3 extends keyof ValidParams
//   >(p1: P1, p2: P2, p3: P3): Record<P1, ValidParams[P1]> & Record<P2, ValidParams[P2]> & Record<P3, ValidParams[P3]>{
//     throw new Error('Oh Dear');
//   }

// function assertNever(x: any): never {
//   throw new Error('AssertNever');
// }


// type Keys<T> = { [K in keyof T]: K }[keyof T];

// interface UrlParamTypes {
//   giftId: string;
//   limit: number;
// }

// type UrlParam = Keys<UrlParamTypes>

// type R<P extends UrlParam> = Record<P, UrlParamTypes[P]>


// type Validate1<P1 extends UrlParam> = (p1: P1) => R<P1>;

// type Validate2<
//   P1 extends UrlParam,
//   P2 extends UrlParam,
//   > = (p1: P1, p2: P2) => R<P1> & R<P2>;

// type Validate3<
//   P1 extends UrlParam,
//   P2 extends UrlParam,
//   P3 extends UrlParam,
//   > = (p1: P1, p2: P2, p3: P3) => R<P1> & R<P2> & R<P3>;
