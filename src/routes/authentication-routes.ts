import { Router } from 'express';
import {
  loginSchema,
  signupSchema,
} from 'features/authentication/authentication-schema';
import { loginHandler } from 'features/authentication/login-handler';
import { logoutHandler } from 'features/authentication/logout-handler';
import { signupHandler } from 'features/authentication/signup-handler';
import createRoute from 'middleware/create-route';
import withValidation from 'middleware/with-validation';

const authenticationRoute = Router();

authenticationRoute.post(
  '/login',
  createRoute(withValidation(loginSchema), loginHandler),
);
authenticationRoute.post(
  '/signup',
  createRoute(withValidation(signupSchema), signupHandler),
);
authenticationRoute.post('/logout', createRoute(logoutHandler));

export default authenticationRoute;
