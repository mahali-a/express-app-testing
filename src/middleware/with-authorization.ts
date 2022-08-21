import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'utils/config';
import { HttpError } from 'utils/errors';
import type { RequestResponseObject } from 'utils/types';

const validateRequest = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET as string, async (error, session) => {
      if (error) {
        reject(error);
      } else {
        resolve(session);
      }
    });
  });

const withAuthorization = async <
  CustomRequestResponseObject extends RequestResponseObject,
>(
  requestResponseObject: CustomRequestResponseObject,
): Promise<CustomRequestResponseObject | CustomRequestResponseObject> => {
  try {
    if (requestResponseObject?.response?.headersSent) {
      return requestResponseObject;
    }

    const authorization = requestResponseObject.request.headers[
      'authorization'
    ] as string;
    if (!authorization) {
      throw HttpError.fromCode(401);
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw HttpError.fromCode(401);
    }

    const token: string = bearer[1];

    const user = await validateRequest(token);

    if (user) {
      const request = { ...requestResponseObject.request, user };
      return { ...requestResponseObject, request };
    }

    throw HttpError.fromCode(401);
  } catch {
    throw HttpError.fromCode(401);
  }
};

export default withAuthorization;
