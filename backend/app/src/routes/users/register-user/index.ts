import { FastifyInstance } from 'fastify';

import { body, response } from './schemas';
import handler from './handler';

const registerUserRoute = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'POST',
    url: '',
    schema: {
      tags: ['Users'],
      description: 'Register a new user',
      body,
      response,
    },
    handler,
  });
};

export default registerUserRoute;
