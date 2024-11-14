import { FastifyReply, FastifyRequest } from 'fastify';
import { createDish } from '@repositories/dishes-repository';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const Handler = async (
  req: FastifyRequest<{ Body: TBody }>,
  res: FastifyReply): Promise<void> => {
  const request = req.body;

  const dish = await createDish(request);

  return res.success(HttpStatusCode.ok, dish);
};

export default Handler;
