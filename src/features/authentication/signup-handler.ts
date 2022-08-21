import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import { HttpError } from 'utils/errors';
import { ApiHandler } from 'utils/types';

import { SignupBody } from './authentication-types';

export const signupHandler: ApiHandler<SignupBody> = async ({
  request,
  response,
}) => {
  const prisma = new PrismaClient();

  const { body } = request;

  const { email, password, name } = body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw new HttpError(422, 'User already exists with this email');
  }

  const salt = await genSalt();
  const passwordHash = await hash(password, salt);

  await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
    },
  });

  response.status(204).json({ message: 'Signup succesful' });
};
