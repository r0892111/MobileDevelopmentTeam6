import { Prisma, User } from '@prisma/client';
import { prismaInstance } from '@libs/prisma-client';
import { encryptPassword } from '@libs/password';
import { CreateUserData } from '@entities/user-entity';

import { handleError } from './error-handling-repository';

/**
 * Count Users
 */
const countUsersFn = async (where?: Prisma.UserWhereInput): Promise<number> => {
  return prismaInstance.user.count({ where });
};

export const countUsers = handleError(countUsersFn);

/**
 * Create User
 */
const createUserQuery = async (data: CreateUserData): Promise<User> => {
  const hashedPassword = await encryptPassword(data.password);
  return prismaInstance.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
};

export type CreateUserQueryType = Prisma.PromiseReturnType<typeof createUserQuery>;

const createUserFn = async (data: CreateUserData): Promise<CreateUserQueryType> => {
  return await createUserQuery(data);
};

export const createUser = handleError(createUserFn);

/**
 * Find User by Email
 */
const getUserByEmailQuery = async (email: string): Promise<User | null> => {
  return prismaInstance.user.findUnique({ where: { email } });
};

export type GetUserByEmailQueryType = Prisma.PromiseReturnType<typeof getUserByEmailQuery>;

const getUserByEmailFn = async (email: string): Promise<GetUserByEmailQueryType> => {
  return await getUserByEmailQuery(email);
};

export const getUserByEmail = handleError(getUserByEmailFn);
