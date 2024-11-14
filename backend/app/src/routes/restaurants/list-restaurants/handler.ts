import { FastifyReply, FastifyRequest } from 'fastify';
import { countRestaurants, listRestaurants } from '@repositories/restaurants-repository';
import { parseIncludeParams } from '@libs/parseQuery';
import { parsePaginationParams } from '@libs/pagination';
import { HttpStatusCode } from '@enums/http-status-enums';

import { includeConfigs, TQuerystring } from './schemas';

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const includes = parseIncludeParams(req.query as TQuerystring, includeConfigs);
  const { pagination, includeTotalCount } = parsePaginationParams(req);

  const restaurants = await listRestaurants(pagination, includes);

  if (includeTotalCount) {
    const totalCount = await countRestaurants();
    return res.success(HttpStatusCode.ok, restaurants, { totalCount, pagination })
  }

  return res.success(HttpStatusCode.ok, restaurants, { pagination });
};

export default handler;
