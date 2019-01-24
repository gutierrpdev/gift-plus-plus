type Keys<T> = { [K in keyof T]: K }[keyof T];

interface UrlParamTypes {
  giftId: string;
  limit: number;
}

type UrlParam = Keys<UrlParamTypes>;

type R<P extends UrlParam> = Record<P, UrlParamTypes[P]>;


type Validate1<P1 extends UrlParam> = (p1: P1) => R<P1>;

type Validate2<
  P1 extends UrlParam,
  P2 extends UrlParam,
  > = (p1: P1, p2: P2) => R<P1> & R<P2>;

type Validate3<
  P1 extends UrlParam,
  P2 extends UrlParam,
  P3 extends UrlParam,
  > = (p1: P1, p2: P2, p3: P3) => R<P1> & R<P2> & R<P3>;
