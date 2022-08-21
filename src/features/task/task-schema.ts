import { Validators } from 'middleware/with-validation';

export const createTaskSchema: Validators = {
  POST: {
    title: {
      notEmpty: {
        errorMessage: 'title is required',
      },
    },
    completed: {
      notEmpty: {
        errorMessage: 'completed is required',
      },
      isBoolean: {
        errorMessage: 'completed must be a boolean',
      },
    },
  },
};

export const updateTaskSchema: Validators = {
  PATCH: {
    id: {
      in: 'params',
      isString: {
        errorMessage: 'id must be a string',
      },
      notEmpty: {
        errorMessage: 'id is required',
      },
    },
    title: {
      optional: {},
    },
    completed: {
      optional: {},
    },
  },
};

export const deleteTaskSchema: Validators = {
  DELETE: {
    id: {
      in: 'params',
      isString: {
        errorMessage: 'id must be a string',
      },
      notEmpty: {
        errorMessage: 'id is required',
      },
    },
  },
};

export const getTaskSchema: Validators = {
  DELETE: {
    id: {
      in: 'params',
      isString: {
        errorMessage: 'id must be a string',
      },
      notEmpty: {
        errorMessage: 'id is required',
      },
    },
  },
};
