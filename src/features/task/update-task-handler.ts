import { PrismaClient, Task } from '@prisma/client';
import { HttpError } from 'utils/errors';
import { ApiHandler } from 'utils/types';

export const updateTaskHandler: ApiHandler<Partial<Task>> = async ({
  request,
  response,
}) => {
  const prisma = new PrismaClient();
  const user = request.user;

  const { id } = request.params;

  const { completed, title } = request.body;

  const post = await prisma.task.findUnique({
    where: {
      id: +id,
    },
  });

  if (post?.userId !== user.sub) {
    throw HttpError.fromCode(404);
  } else {
    const result = await prisma.task.update({
      where: {
        id: +id,
      },
      data: {
        ...(title && { title }),
        ...(completed && { completed }),
      },
    });
    response.status(200).send({ data: result });
  }
};
