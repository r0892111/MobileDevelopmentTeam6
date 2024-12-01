import { FastifyReply, FastifyRequest } from 'fastify';
import JWTService from '@services/jwt-service';
import { createUser } from '@repositories/users-repository';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const jwtService = new JWTService();

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { name, email, password } = req.body as TBody;

  const user = await createUser({ name, email, password });

  const token = jwtService.signToken({ userId: user.id }, '15d');

  return res.success(HttpStatusCode.ok, {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};

export default handler;
