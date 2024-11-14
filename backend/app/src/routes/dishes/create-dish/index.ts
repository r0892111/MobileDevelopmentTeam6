import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const createDish = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'POST',
    url: '',
    schema: {
      tags: ['Dishes'],
      description: 'Create a new dish',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default createDish;
