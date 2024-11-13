import { FromSchema } from 'json-schema-to-ts';

export const createRestaurantSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    address: { type: 'string' },
    imageUrl: { type: 'string', format: 'uri' },
    cost: { type: 'number', minimum: 1, maximum: 3 }
  },
  required: ['name', 'description', 'address', 'imageUrl', 'cost'],
  additionalProperties: false,
} as const;

export type CreateRestaurantData = FromSchema<typeof createRestaurantSchema>;

export const updateRestaurantSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    address: { type: 'string' },
    imageUrl: { type: 'string', format: 'uri' },
    rating: { type: 'number', minimum: 0.0, maximum: 5.0 },
    cost: { type: 'number', minimum: 1, maximum: 3 }
  },
  anyOf: [
    { required: ['name'] },
    { required: ['description'] },
    { required: ['address'] },
    { required: ['imageUrl'] },
    { required: ['rating'] },
    { required: ['cost'] }
  ],
  additionalProperties: false,
} as const;

export type UpdateRestaurantData = FromSchema<typeof updateRestaurantSchema>;
