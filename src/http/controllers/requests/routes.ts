import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { declineDeliveryRequest } from './declined-request'
import { acceptDeliveryRequest } from './accepted-request'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerRequest } from './register'
import { FastifyInstance } from 'fastify'
import { requests } from './requests'

export async function requestsRoutes(app: FastifyInstance) {
  //* Visualizar solicitações abertas (Somente empresa) */
  app.get(
    '/requests',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    requests,
  )

  //* Solicitar frete específico disponível (Somente entregadores) */
  app.post(
    '/request/:freight_id',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    registerRequest,
  )

  //* Atualizações de frete */
  //* Aceitar solicitação */
  app.patch(
    '/requests/:id/accept',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    acceptDeliveryRequest,
  )
  //* Rejeitar solicitação */
  app.patch(
    '/requests/:id/decline',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    declineDeliveryRequest,
  )
}
