import { Prisma, Restaurant } from '@prisma/client';
import { prismaInstance } from '@libs/prisma-client';
import { Pagination, paginationForComplexQuery, PaginationQuery } from '@libs/pagination';
import { CreateRestaurantData, UpdateRestaurantData } from '@entities/restaurant-entity';

import { handleError } from './error-handling-repository';

/**
 * Count
 */

const countRestaurantsFn = async (where?: Prisma.RestaurantWhereInput): Promise<number> => {
  const count = await prismaInstance.restaurant.count({ where });
  return count;
};

export const countRestaurants = handleError(countRestaurantsFn);

const countRestaurantsAboveId = async (
  restaurantId: number | undefined,
  where?: Prisma.RestaurantWhereInput): Promise<number> =>
  prismaInstance.restaurant.count({ where: { id: { gt: restaurantId }, ...where } });

/**
 * Create
 */

const createRestaurantQuery = async (data: CreateRestaurantData): Promise<Restaurant> =>
  prismaInstance.restaurant.create({
    data: {
      name: data.name,
      description: data.description,
      address: data.address,
      imageUrl: data.imageUrl,
      cost: data.cost,
    },
  });

export type CreateRestaurantQueryType = Prisma.PromiseReturnType<typeof createRestaurantQuery>;

const createRestaurantFn = async (data: CreateRestaurantData): Promise<CreateRestaurantQueryType> => {
  const restaurant = await createRestaurantQuery(data);
  return restaurant;
};

export const createRestaurant = handleError(createRestaurantFn);

/**
 * List
 */

const listRestaurantsQuery = async (
  pageForQuery?: PaginationQuery,
  include?: Prisma.RestaurantInclude,
  where?: Prisma.RestaurantWhereInput
): Promise<Restaurant[]> =>
  prismaInstance.restaurant.findMany({
    ...(pageForQuery && pageForQuery),
    include: { ...include },
    where: { ...where },
    orderBy: { id: 'desc' },
  });

export type ListRestaurantsQueryType = Prisma.PromiseReturnType<typeof listRestaurantsQuery>;

const listRestaurantsFn = async (
  pagination?: Pagination,
  include?: Prisma.RestaurantInclude,
  where?: Prisma.RestaurantWhereInput,
): Promise<ListRestaurantsQueryType> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countRestaurantsAboveId(Number(pagination?.findId) || undefined, where),
  );

  const result = await listRestaurantsQuery(paginationQuery, include, where);
  return result;
};

export const listRestaurants = handleError(listRestaurantsFn);

/**
 * Get by ID
 */

const getRestaurantQueryById = async (restaurantId: number): Promise<Restaurant> =>
  prismaInstance.restaurant.findUniqueOrThrow({ where: { id: restaurantId } });

export type GetRestaurantQueryByIdType = Prisma.PromiseReturnType<typeof getRestaurantQueryById>;

const getRestaurantByIdFn = async (restaurantId: number): Promise<GetRestaurantQueryByIdType> => {
  const restaurant = await getRestaurantQueryById(restaurantId);
  return restaurant;
};

export const getRestaurantById = handleError(getRestaurantByIdFn);

/**
 * Update
 */

const updateRestaurantQuery = async (restaurantId: number, data: UpdateRestaurantData): Promise<Restaurant> =>
  prismaInstance.restaurant.update({
    where: { id: restaurantId },
    data,
  });

export type UpdateRestaurantQueryType = Prisma.PromiseReturnType<typeof updateRestaurantQuery>;

const updateRestaurantFn = async (
  restaurantId: number,
  data: UpdateRestaurantData
): Promise<UpdateRestaurantQueryType> => {
  const restaurant = await updateRestaurantQuery(restaurantId, data);
  return restaurant;
};

export const updateRestaurant = handleError(updateRestaurantFn);

/**
 * Delete
 */

const deleteRestaurantQuery = async (restaurantId: number): Promise<void> => {
  await prismaInstance.restaurant.delete({ where: { id: restaurantId } });
};

export type DeleteRestaurantQueryType = Prisma.PromiseReturnType<typeof deleteRestaurantQuery>;

const deleteRestaurantFn = async (restaurantId: number): Promise<void> => {
  await deleteRestaurantQuery(restaurantId);
};

export const deleteRestaurant = handleError(deleteRestaurantFn);
