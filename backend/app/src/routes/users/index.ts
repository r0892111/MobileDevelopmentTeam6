import { FastifyInstance } from 'fastify';

import registerUserRoute from './register-user';
import loginUserRoute from './login-user';

const Users = async (app: FastifyInstance): Promise<void> => {
  app.register(registerUserRoute, { prefix: '/register' });
  app.register(loginUserRoute, { prefix: '/login' });
};

export default Users;
