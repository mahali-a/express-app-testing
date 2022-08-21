import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { HttpError } from 'utils/errors';
import { getSignedToken } from 'utils/jwt';
import { ApiHandler } from 'utils/types';

import { LoginBody } from './authentication-types';

export const loginHandler: ApiHandler<LoginBody> = async ({
  request,
  response,
}) => {
  const prisma = new PrismaClient();

  const { body } = request;

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new HttpError(401, 'Email or password is incorrect');
  }

  const compareResult = await compare(body.password, user.password);

  if (!compareResult) {
    throw new HttpError(401, 'Email or password is incorrect');
  }

  const userInfo = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };

  const token = getSignedToken(userInfo);
  response.json({
    message: 'Logged in successfully 😊',
    data: { accessToken: token },
  });
};
