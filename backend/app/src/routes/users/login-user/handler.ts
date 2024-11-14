import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import JWTService from '@services/jwt-service';
import { getUserByEmail } from '@repositories/users-repository';
import { HttpStatusCode } from '@enums/http-status-enums';

import { TBody } from './schemas';

const jwtService = new JWTService();


const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { email, password } = req.body as TBody;
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.code(401).send({ error: 'Invalid email or password' });
  }

  const token = jwtService.signToken({ userId: user.id }, '1d');
  return res.success(HttpStatusCode.ok, { token });
};

export default handler;
