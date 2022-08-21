import { Router } from 'express';
import { createTaskHandler } from 'features/task/create-task-handler';
import { deleteTaskHandler } from 'features/task/delete-task-handler';
import { getTaskHandler } from 'features/task/get-task-handler';
import { getTasksHandler } from 'features/task/get-tasks-handler';
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from 'features/task/task-schema';
import { updateTaskHandler } from 'features/task/update-task-handler';
import createRoute from 'middleware/create-route';
import withAuthorization from 'middleware/with-authorization';
import withValidation from 'middleware/with-validation';

const taskRoute = Router();

taskRoute.get('/', createRoute(withAuthorization, getTasksHandler));
taskRoute.post(
  '/',
  createRoute(
    withValidation(createTaskSchema),
    withAuthorization,
    createTaskHandler,
  ),
);
taskRoute.get(
  '/:id',
  createRoute(withValidation(getTaskSchema), withAuthorization, getTaskHandler),
);
taskRoute.patch(
  '/:id',
  createRoute(
    withValidation(updateTaskSchema),
    withAuthorization,
    updateTaskHandler,
  ),
);
taskRoute.delete(
  '/:id',
  createRoute(
    withValidation(deleteTaskSchema),
    withAuthorization,
    deleteTaskHandler,
  ),
);

export default taskRoute;
