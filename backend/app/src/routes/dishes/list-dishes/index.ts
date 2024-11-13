import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const listDishes = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Dishes'],
      description: 'List all dishes',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default listDishes;
