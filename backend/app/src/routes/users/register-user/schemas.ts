import { FromSchema } from 'json-schema-to-ts';

export const body = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  additionalProperties: false,
  required: ['name', 'email', 'password'],
} as const;

export type TBody = FromSchema<typeof body>;

export const params = {} as const;

export type TParams = FromSchema<typeof params>;

export const headers = {} as const;

export type THeaders = FromSchema<typeof headers>;

export const querystring = {} as const;
export type TQuerystring = FromSchema<typeof querystring>;

export const response = {} as const;

export type TResponse = FromSchema<typeof response>;
