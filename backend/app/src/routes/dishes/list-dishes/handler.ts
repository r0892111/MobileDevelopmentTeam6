import { FastifyReply, FastifyRequest } from 'fastify';
import { countDishes, listDishes } from '@repositories/dishes-repository';
import { parsePaginationParams } from '@libs/pagination';
import { HttpStatusCode } from '@enums/http-status-enums';

const handler = async (
  req: FastifyRequest,
  res: FastifyReply): Promise<void> => {
  const { pagination, includeTotalCount } = parsePaginationParams(req);

  const dishes = await listDishes(pagination);

  if (includeTotalCount) {
    const totalCount = await countDishes();
    return res.success(HttpStatusCode.ok, dishes, { totalCount, pagination })
  }

  return res.success(HttpStatusCode.ok, dishes, { pagination });
};

export default handler;
