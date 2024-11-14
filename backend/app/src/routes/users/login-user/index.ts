import { FastifyInstance } from 'fastify';

import { body, response } from './schemas';
import handler from './handler';

const loginUserRoute = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'POST',
    url: '',
    schema: {
      tags: ['Users'],
      description: 'Login user and get JWT token',
      body,
      response,
    },
    handler,
  });
};

export default loginUserRoute;
