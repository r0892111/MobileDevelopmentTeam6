import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const createRestaurant = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'POST',
    url: '',
    schema: {
      tags: ['Restaurants'],
      description: 'Create a new restaurant',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default createRestaurant;
