import { FastifyInstance } from 'fastify';

import Health from './health';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(Health, { prefix: '/health' });
}
