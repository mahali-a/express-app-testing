import { PrismaClient } from '@prisma/client';
import { HttpError } from 'utils/errors';
import { ApiHandler } from 'utils/types';

export const deleteTaskHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  const user = request.user;

  const { id } = request.params;

  const post = await prisma.task.findUnique({
    where: {
      id: +id,
    },
  });

  if (!post) {
    throw HttpError.fromCode(404);
  }

  if (post?.userId !== user.sub) {
    throw HttpError.fromCode(404);
  } else {
    await prisma.task.delete({
      where: {
        id: +id,
      },
    });
    response.status(204).json({ message: 'Deleted' });
  }
};
