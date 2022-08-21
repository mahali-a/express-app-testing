import { ApiHandler } from 'utils/types';

export const logoutHandler: ApiHandler = async ({ response }) => {
  response
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Successfully logged out 😏 🍀' });
};
