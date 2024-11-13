import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '@enums/http-status-enums';
import { ErrorsEnum } from '@enums/errors-enums';

export async function isAuthenticated(req: FastifyRequest, res: FastifyReply): Promise<void> {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    res.error('You need to be register', HttpStatusCode.forbidden, ErrorsEnum.unauthorized);
  }
}
