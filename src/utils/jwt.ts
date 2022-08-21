import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import { JWT_SECRET } from './config';

export const getSignedToken = (userInfo: Partial<User>) =>
  sign(userInfo, JWT_SECRET);
