import { FastifyInstance } from 'fastify';

import Users from './users';
import Restaurants from './restaurants';
import Health from './health';
import Dishes from './dishes';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(Health, { prefix: '/health' });
  app.register(Dishes, { prefix: '/dishes' });
  app.register(Restaurants, { prefix: '/restaurants' });
  app.register(Users, { prefix: '/users' });
}
