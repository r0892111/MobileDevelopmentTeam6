import { FromSchema } from 'json-schema-to-ts';
import { mergeSchemas } from '@libs/utils';
import { paginationQuerySchema } from '@entities/pagination-query';

export const body = {} as const;

export type TBody = FromSchema<typeof body>;

export const params = {} as const;

export type TParams = FromSchema<typeof params>;

export const headers = {} as const;

export type THeaders = FromSchema<typeof headers>;

export const querystring = mergeSchemas(paginationQuerySchema);
export type TQuerystring = FromSchema<typeof querystring>;

export const response = {} as const;

export type TResponse = FromSchema<typeof response>;
