import { Prisma, User } from '@prisma/client';
import { prismaInstance } from '@libs/prisma-client';
import { Pagination, paginationForComplexQuery, PaginationQuery } from '@libs/pagination';
import { CreateUserData, UpdateUserData } from '@entities/user-entity';

import { handleError } from './error-handling-repository';

/**
 * Count
 */

const countUsersFn = async (where?: Prisma.UserWhereInput): Promise<number> => {
  const count = await prismaInstance.user.count({ where });
  return count;
};

export const countUsers = handleError(countUsersFn);

const countUsersAboveId = async (userId: string | undefined, where?: Prisma.UserWhereInput): Promise<number> =>
  prismaInstance.user.count({ where: { id: { gt: userId }, ...where } });

/**
 * Create
 */

const createUserQuery = async (data: CreateUserData): Promise<User> =>
  prismaInstance.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

export type CreateUserQueryType = Prisma.PromiseReturnType<typeof createUserQuery>;

const createUserFn = async (data: CreateUserData): Promise<CreateUserQueryType> => {
  const user = await createUserQuery(data);
  return user;
};

export const createUser = handleError(createUserFn);

/**
 * List
 */

const listUsersQuery = async (pageForQuery?: PaginationQuery, where?: Prisma.UserWhereInput): Promise<User[]> =>
  prismaInstance.user.findMany({
    ...(pageForQuery && pageForQuery),
    where,
    orderBy: { id: 'desc' },
  });

export type ListUsersQueryType = Prisma.PromiseReturnType<typeof listUsersQuery>;

const listUsersFn = async (
  pagination?: Pagination,
  where?: Prisma.UserWhereInput,
): Promise<ListUsersQueryType> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countUsersAboveId(pagination?.findId, where),
  );

  const result = await listUsersQuery(paginationQuery, where);
  return result;
};

export const listUsers = handleError(listUsersFn);

/**
 * Get by ID
 */

const getUserQueryById = async (userId: string): Promise<User> =>
  prismaInstance.user.findUniqueOrThrow({ where: { id: userId } });

export type GetUserQueryByIdType = Prisma.PromiseReturnType<typeof getUserQueryById>;

const getUserByIdFn = async (userId: string): Promise<GetUserQueryByIdType> => {
  const user = await getUserQueryById(userId);
  return user;
};

export const getUserById = handleError(getUserByIdFn);

/**
 * Update
 */

const updateUserQuery = async (userId: string, data: UpdateUserData): Promise<User> =>
  prismaInstance.user.update({
    where: { id: userId },
    data,
  });

export type UpdateUserQueryType = Prisma.PromiseReturnType<typeof updateUserQuery>;

const updateUserFn = async (userId: string, data: UpdateUserData): Promise<UpdateUserQueryType> => {
  const user = await updateUserQuery(userId, data);
  return user;
};

export const updateUser = handleError(updateUserFn);

/**
 * Delete
 */

const deleteUserQuery = async (userId: string): Promise<void> => {
  await prismaInstance.user.delete({ where: { id: userId } });
};

export type DeleteUserQueryType = Prisma.PromiseReturnType<typeof deleteUserQuery>;

const deleteUserFn = async (userId: string): Promise<void> => {
  await deleteUserQuery(userId);
};

export const deleteUser = handleError(deleteUserFn);
