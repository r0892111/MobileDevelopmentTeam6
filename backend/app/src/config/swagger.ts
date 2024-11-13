import { FastifyInstance } from 'fastify';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';

export const setupSwagger = (ffy: FastifyInstance): void => {
  ffy.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API',
        description: "application API",
        version: '0.1.0',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
  });

  ffy.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    staticCSP: true,
    transformSpecification: (swaggerObject) => swaggerObject,
  });
};
