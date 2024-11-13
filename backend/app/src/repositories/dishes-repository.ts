import { Prisma, Dish } from '@prisma/client';
import { prismaInstance } from '@libs/prisma-client';
import { Pagination, paginationForComplexQuery, PaginationQuery } from '@libs/pagination';
import { CreateDishData, UpdateDishData } from '@entities/dish-entity';

import { handleError } from './error-handling-repository';

/**
 * Count
 */

const countDishesFn = async (where?: Prisma.DishWhereInput): Promise<number> => {
  const count = await prismaInstance.dish.count({ where });
  return count;
};

export const countDishes = handleError(countDishesFn);

const countDishesAboveId = async (dishId: number | undefined, where?: Prisma.DishWhereInput): Promise<number> =>
  prismaInstance.dish.count({ where: { id: { gt: dishId }, ...where } });

/**
 * Create
 */

const createDishQuery = async (data: CreateDishData): Promise<Dish> =>
  prismaInstance.dish.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
      restaurantId: data.restaurantId,
    },
  });

export type CreateDishQueryType = Prisma.PromiseReturnType<typeof createDishQuery>;

const createDishFn = async (data: CreateDishData): Promise<CreateDishQueryType> => {
  const dish = await createDishQuery(data);
  return dish;
};

export const createDish = handleError(createDishFn);

/**
 * List
 */

const listDishesQuery = async (pageForQuery?: PaginationQuery, where?: Prisma.DishWhereInput): Promise<Dish[]> =>
  prismaInstance.dish.findMany({
    ...(pageForQuery && pageForQuery),
    where,
    orderBy: { id: 'desc' },
  });

export type ListDishesQueryType = Prisma.PromiseReturnType<typeof listDishesQuery>;

const listDishesFn = async (
  pagination?: Pagination,
  where?: Prisma.DishWhereInput,
): Promise<ListDishesQueryType> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countDishesAboveId(Number(pagination?.findId) || undefined, where),
  );

  const result = await listDishesQuery(paginationQuery, where);
  return result;
};

export const listDishes = handleError(listDishesFn);

/**
 * Get by ID
 */

const getDishQueryById = async (dishId: number): Promise<Dish> =>
  prismaInstance.dish.findUniqueOrThrow({ where: { id: dishId } });

export type GetDishQueryByIdType = Prisma.PromiseReturnType<typeof getDishQueryById>;

const getDishByIdFn = async (dishId: number): Promise<GetDishQueryByIdType> => {
  const dish = await getDishQueryById(dishId);
  return dish;
};

export const getDishById = handleError(getDishByIdFn);

/**
 * Update
 */

const updateDishQuery = async (dishId: number, data: UpdateDishData): Promise<Dish> =>
  prismaInstance.dish.update({
    where: { id: dishId },
    data,
  });

export type UpdateDishQueryType = Prisma.PromiseReturnType<typeof updateDishQuery>;

const updateDishFn = async (dishId: number, data: UpdateDishData): Promise<UpdateDishQueryType> => {
  const dish = await updateDishQuery(dishId, data);
  return dish;
};

export const updateDish = handleError(updateDishFn);

/**
 * Delete
 */

const deleteDishQuery = async (dishId: number): Promise<void> => {
  await prismaInstance.dish.delete({ where: { id: dishId } });
};

export type DeleteDishQueryType = Prisma.PromiseReturnType<typeof deleteDishQuery>;

const deleteDishFn = async (dishId: number): Promise<void> => {
  await deleteDishQuery(dishId);
};

export const deleteDish = handleError(deleteDishFn);
