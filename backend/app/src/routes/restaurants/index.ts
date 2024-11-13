import { FastifyInstance } from 'fastify';

import listRestaurants from './list-restaurants';
import getRestaurant from './get-restaurant';

const Restaurants = async (app: FastifyInstance): Promise<void> => {
  app.register(listRestaurants);
  app.register(getRestaurant);
};

export default Restaurants;
