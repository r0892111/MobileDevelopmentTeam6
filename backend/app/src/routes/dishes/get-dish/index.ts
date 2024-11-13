import { FastifyInstance } from 'fastify';

import { headers, params, querystring, response } from './schemas';
import handler from './handler';

const getDish = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'GET',
    url: '/:dishId',
    schema: {
      tags: ['Dishes'],
      description: 'Get a dish by id',
      headers,
      params,
      querystring,
      response,
    },
    handler,
  });
};

export default getDish;
