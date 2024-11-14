import { FastifyInstance } from 'fastify';

import listRestaurants from './list-restaurants';
import getRestaurant from './get-restaurant';
import createRestaurant from './create-restaurant';

const Restaurants = async (app: FastifyInstance): Promise<void> => {
  app.register(listRestaurants);
  app.register(getRestaurant);
  app.register(createRestaurant);
};

export default Restaurants;
