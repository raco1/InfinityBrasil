import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { freights } from './freights'
import { update } from './update'

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

  //* Alterar o status do frete assim que finalizar (Somente entregadores) */
  app.patch(
    '/freight/:freight_id/update',
    { onRequest: verifyUserProfile('Deliverer') },
    update,
  )
}
