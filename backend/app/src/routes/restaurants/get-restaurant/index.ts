import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const getRestaurant = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'GET',
    url: '/:restaurantId',
    schema: {
      tags: ['Restaurants'],
      description: 'Get a restaurant by id',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default getRestaurant;
