import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser } from '@repositories/users-repository';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { name, email, password } = req.body as TBody;

  const user = await createUser({ name, email, password });

  return res.success(HttpStatusCode.ok, user);
};

export default handler;
