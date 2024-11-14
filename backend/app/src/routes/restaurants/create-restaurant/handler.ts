import { FastifyReply, FastifyRequest } from 'fastify';
import { createRestaurant } from '@repositories/restaurants-repository';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const Handler = async (
  req: FastifyRequest<{ Body: TBody }>,
  res: FastifyReply): Promise<void> => {
  const request = req.body;

  const restaurant = await createRestaurant(request);

  return res.success(HttpStatusCode.ok, restaurant);
};

export default Handler;
