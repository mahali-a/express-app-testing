import { PrismaClient } from '@prisma/client';
import { ApiHandler } from 'utils/types';

export const getTasksHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { sub } = request.user;

  const tasks = await prisma.task.findMany({
    where: {
      userId: sub,
    },
  });

  response.status(200).send({ data: tasks });
};
