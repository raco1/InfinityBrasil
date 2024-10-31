import { acceptDeliveryRequest } from '../requests/accepted-request'
import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerRequest } from '../requests/register'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { freights } from './freights'
import { declineDeliveryRequest } from '../requests/declined-request'

export async function freightsRoutes(app: FastifyInstance) {
  //* Registrar um novo frete (Somente empresas) */
  app.post(
    '/freight/register',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    register,
  )

  //* Visualizar os fretes disponíveis (Somente entregadores) */
  app.get(
    '/freights',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    freights,
  )

  //* Solicitar frete específico disponível (Somente entregadores) */
  app.post(
    '/freight/:freight_id/request',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    registerRequest,
  )

  //* Atualizações de frete */
  //* Aceitar solicitação */
  app.patch(
    '/freight/requests/:request_id/accept',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    acceptDeliveryRequest,
  )
  //* Rejeitar solicitação */
  app.patch(
    '/freight/requests/:request_id/decline',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    declineDeliveryRequest,
  )
}
