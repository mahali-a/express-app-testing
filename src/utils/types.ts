/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export type Factory<Shape> = (state?: Partial<Shape>) => Shape;

export type ApiHandler<A = any, B = any> = ({
  request,
  response,
}: {
  request: CustomApiRequest<A>;
  response: Response<B>;
}) => void | Promise<void>;

export type ApiErrorResponse = { message: string; code: number };

export interface CustomApiRequest<P> extends Omit<Request, 'query' | 'body'> {
  query: {
    [key: string]: string;
  };
  body: P;
  user: {
    sub: number;
    email: string;
    name: string;
    iat: number;
  };
}

/**
 * Returns type of the value for a resolved promise, the return type of a
 * function or the resolved value for a promise returning function.
 */
export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...arguments_: any) => Promise<infer U>
  ? U
  : T extends (...arguments_: any) => infer U
  ? U
  : T;

export type RequestResponseObject<RequestData = any, ResponseData = any> = {
  request: CustomApiRequest<RequestData>;
  response: Response<ResponseData>;
};

export type Session = {
  /** Issuer (who created and signed this token) */
  iss?: string;
  /** Subject (whom the token refers to) */
  sub?: string;
  /** Audience (who or what the token is intended for) */
  aud?: string[];
  /** Issued at (seconds since Unix epoch) */
  iat?: number;
  /** Expiration time (seconds since Unix epoch) */
  exp?: number;
  /** Authorization party (the party to which this token was issued) */
  azp?: string;
  /** Token scope (what the token has access to) */
  scope?: string;
};
