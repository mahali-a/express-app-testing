import { PrismaClient, Task } from '@prisma/client';
import { ApiHandler } from 'utils/types';

export const createTaskHandler: ApiHandler<Task> = async ({
  request,
  response,
}) => {
  const prisma = new PrismaClient();
  const { sub } = request.user;

  const { body } = request;

  const post = await prisma.task.create({
    data: {
      ...body,
      userId: sub,
    },
  });

  response.status(200).send({ data: post });
};
