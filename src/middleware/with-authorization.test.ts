import express, { Request, RequestHandler, Response } from 'express';
import request from 'supertest';
import { getSignedToken } from 'utils/jwt';
import { describe, expect, it, vi } from 'vitest';

import createRoute from './create-route';
import withAuthorization from './with-authorization';

const PATH = '/with-authorization-middleware-test';
const app = express();

const handler = async ({
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!response.headersSent) {
    response.status(200).json({ status: 'success' });
  }
};

const apiHandler: RequestHandler = createRoute(withAuthorization, handler);

app.get(PATH, apiHandler as unknown as RequestHandler);

describe('with authorization middleware', () => {
  it('returns a response with an error if request has no cookie', async () => {
    const response = await request(app).get(`${PATH}?id=`).expect(401);

    const actual = response.body;
    const expected = { message: 'Unauthorized', code: 401 };

    expect(actual).toEqual(expected);
  });

  it('returns a response with an error if request is has an invalid cookie', async () => {
    const invalid = 'invalid_token';

    const response = await request(app)
      .get(`${PATH}?id=1`)
      .set('authorization', `Bearer ${invalid}`)
      .expect(401);

    const actual = response.body;
    const expected = { message: 'Unauthorized', code: 401 };

    expect(actual).toEqual(expected);
  });

  it.only('returns request and response object if request is has a valid cookie', async () => {
    const token = getSignedToken({
      id: 1,
      name: 'John',
      email: 'johndoe@email.com',
    });

    const response = await request(app)
      .get(`${PATH}?id=1`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    const actual = response.body;
    const expected = { status: 'success' };

    expect(actual).toEqual(expected);
  });
});
