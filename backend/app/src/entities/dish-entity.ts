import { FromSchema } from 'json-schema-to-ts';

export const createDishSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    imageUrl: { type: 'string', format: 'uri' },
    restaurantId: { type: 'integer' }
  },
  required: ['name', 'price', 'description', 'imageUrl', 'restaurantId'],
  additionalProperties: false,
} as const;

export type CreateDishData = FromSchema<typeof createDishSchema>;

export const updateDishSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    imageUrl: { type: 'string', format: 'uri' },
    restaurantId: { type: 'integer' }
  },
  anyOf: [
    { required: ['name'] },
    { required: ['price'] },
    { required: ['description'] },
    { required: ['imageUrl'] },
    { required: ['restaurantId'] }
  ],
  additionalProperties: false,
} as const;

export type UpdateDishData = FromSchema<typeof updateDishSchema>;
