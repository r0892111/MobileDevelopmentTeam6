import { FromSchema } from 'json-schema-to-ts';

export const createUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
} as const;

export type CreateUserData = FromSchema<typeof createUserSchema>;

export const updateUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  anyOf: [
    { required: ['name'] },
    { required: ['email'] },
    { required: ['password'] }
  ],
  additionalProperties: false,
} as const;

export type UpdateUserData = FromSchema<typeof updateUserSchema>;
