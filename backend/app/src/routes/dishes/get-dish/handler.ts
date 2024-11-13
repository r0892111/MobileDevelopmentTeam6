import { FastifyReply, FastifyRequest } from 'fastify';
import { getDishById } from '@repositories/dishes-repository';
import { parsePathParamNumber } from '@libs/parseQuery';
import { HttpStatusCode } from '@enums/http-status-enums';

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const dishId = parsePathParamNumber(req, 'dishId');

  const dish = await getDishById(dishId);

  return res.success(HttpStatusCode.ok, { ...dish });
};

export default handler;
