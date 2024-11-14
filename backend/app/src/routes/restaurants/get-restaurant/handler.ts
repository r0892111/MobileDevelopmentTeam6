import { FastifyReply, FastifyRequest } from 'fastify';
import { getRestaurantById } from '@repositories/restaurants-repository';
import { parsePathParamNumber } from '@libs/parseQuery';
import { HttpStatusCode } from '@enums/http-status-enums';

const Handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const restaurantId = parsePathParamNumber(req, 'restaurantId');

  const restaurant = await getRestaurantById(restaurantId);

  return res.success(HttpStatusCode.ok, restaurant);
};

export default Handler;
