import express, { Request, RequestHandler, Response } from 'express';
import request from 'supertest';
import withSendHeaders from 'tests/with-send-headers';
import { describe, expect, it } from 'vitest';

import createRoute from './create-route';
import withValidation from './with-validation';

const PATH = '/with-validation-middleware-test';
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

const schema = {
  GET: {
    id: {
      exists: {
        errorMessage: 'id is required',
      },
      notEmpty: {
        errorMessage: 'id should not be empty',
      },
    },
  },
};

const apiHandler: RequestHandler = createRoute(
  withSendHeaders,
  withValidation(schema),
  handler,
);

app.get(PATH, apiHandler as unknown as RequestHandler);

describe('with authentication middleware', () => {
  it('returns a response with an error if request has no id', async () => {
    const response = await request(app).get(`${PATH}?id=`).expect(422);

    const actual = response.body;
    const expected = { message: 'id should not be empty', code: 422 };

    expect(actual).toEqual(expected);
  });

  it('returns a response with an error if request has an empty id', async () => {
    const response = await request(app).get(`${PATH}`).expect(422);

    const actual = response.body;
    const expected = { message: 'id is required', code: 422 };

    expect(actual).toEqual(expected);
  });

  it('returns request and response object if request is valid', async () => {
    const response = await request(app).get(`${PATH}?id=1`).expect(200);

    const actual = response.body;
    const expected = { status: 'success' };

    expect(actual).toEqual(expected);
  });
});
