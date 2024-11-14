import { FastifyInstance } from 'fastify';

import listDishes from './list-dishes';
import getDish from './get-dish';
import createDish from './create-dish';

const Dishes = async (app: FastifyInstance): Promise<void> => {
  app.register(listDishes);
  app.register(getDish);
  app.register(createDish);
};

export default Dishes;
