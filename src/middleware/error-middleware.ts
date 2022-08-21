import { NextFunction, Request, Response } from 'express';

interface Error {
  status?: number;
  statusCode?: number;
  message?: string;
  code?: string;
}

const errorMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error?.status === 401 && error?.code === 'credentials_required') {
    response.status(error.status).json({ message: 'Requires authentication' });

    return;
  }

  if (error && error.status && error.status === 401) {
    response.status(error.status).json({ message: 'Unauthorized', code: 401 });

    return;
  }

  const status = error.statusCode || error.code || 500;
  const message = error.message || 'internal error';

  response.status(+status).json({ message });
};

export { errorMiddleware };
