import { Validators } from 'middleware/with-validation';

export const signupSchema: Validators = {
  POST: {
    email: {
      notEmpty: {
        errorMessage: 'email is required',
      },
      isEmail: {
        errorMessage: 'email is invalid',
      },
    },
    name: {
      notEmpty: {
        errorMessage: 'name is required',
      },
      isString: {
        errorMessage: 'name is invalid',
      },
    },
    password: {
      notEmpty: {
        errorMessage: 'password is required',
      },
      isStrongPassword: {
        errorMessage: 'password is not strong enough',
      },
    },
  },
};

export const loginSchema: Validators = {
  POST: {
    email: {
      notEmpty: {
        errorMessage: 'email is required',
      },
      isEmail: {
        errorMessage: 'email is invalid',
      },
    },
    password: {
      notEmpty: {
        errorMessage: 'password is required',
      },
    },
  },
};
