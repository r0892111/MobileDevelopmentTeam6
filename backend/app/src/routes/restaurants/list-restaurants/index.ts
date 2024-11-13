import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const listRestaurants = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Restaurants'],
      description: 'List all restaurants',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default listRestaurants;
