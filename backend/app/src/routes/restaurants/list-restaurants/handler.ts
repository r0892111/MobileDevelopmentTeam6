import { FastifyReply, FastifyRequest } from 'fastify';
import { countRestaurants, listRestaurants } from '@repositories/restaurants-repository';
import { parsePaginationParams } from '@libs/pagination';
import { HttpStatusCode } from '@enums/http-status-enums';

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { pagination, includeTotalCount } = parsePaginationParams(req);

  const restaurants = await listRestaurants(pagination);

  if (includeTotalCount) {
    const totalCount = await countRestaurants();
    return res.success(HttpStatusCode.ok, { ...restaurants }, { totalCount, pagination })
  }

  return res.success(HttpStatusCode.ok, { ...restaurants }, { pagination });
};

export default handler;
