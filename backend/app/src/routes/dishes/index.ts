import { FastifyInstance } from 'fastify';

import listDishes from './list-dishes';
import getDish from './get-dish';

const Dishes = async (app: FastifyInstance): Promise<void> => {
  app.register(listDishes);
  app.register(getDish);
};

export default Dishes;
