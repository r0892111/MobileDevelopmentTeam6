// src/types/fastify.d.ts
import 'fastify';
import { HttpStatusCode } from '@enums/http-status-enums';
import { ErrorsEnum } from '@enums/errors-enums';

import { ProcessEnvData } from './env-entity';

declare module 'fastify' {
  interface FastifyInstance {
    config: ProcessEnvData;
  }

  interface FastifyReply {
    /**
     * Envoie une réponse de succès avec le code HTTP spécifié.
     *
     * @param statusCode - Le code HTTP de la réponse.
     * @param data - Les données à envoyer dans la réponse.
     * @param meta - Les métadonnées optionnelles pour la réponse.
     */
    success<T>(statusCode: HttpStatusCode, data: T, meta?: Record<string, unknown>): void;

    /**
     * Lève une erreur API avec le code HTTP spécifié.
     *
     * @param message - Le message d'erreur descriptif.
     * @param httpCode - Le code HTTP à retourner.
     * @param statusCode - Le code de statut spécifique à l'application.
     * @param details - Détails supplémentaires sur l'erreur.
     */
    error(
      message: string,
      httpCode?: HttpStatusCode,
      statusCode?: ErrorsEnum,
      details?: Record<string, unknown>,
    ): never;
  }
}
