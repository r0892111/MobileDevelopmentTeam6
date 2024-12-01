import { FastifyReply, FastifyRequest } from 'fastify';
import JWTService from '@services/jwt-service';
import { getUserByEmail } from '@repositories/users-repository';
import { verifyPassword } from '@libs/password';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const jwtService = new JWTService();


const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { email, password } = req.body as TBody;
  const user = await getUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.password))) {
    return res.code(401).send({ error: 'Invalid email or password' });
  }

  const token = jwtService.signToken({ userId: user.id }, '15d'); // on va mettre 15 jours dans le cadre du projet
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
