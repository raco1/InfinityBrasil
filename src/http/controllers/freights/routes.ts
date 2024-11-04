import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { getDelivererFreights } from './get-deliverer-freights'
import { getCompanyFreights } from './get-company-freights'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getAllFreights } from './get-all-freights'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { update } from './update'

export async function freightsRoutes(app: FastifyInstance) {
  //* Registrar um novo frete (Somente empresas) */
  app.post(
    '/freight/register',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    register,
  )

  //* Visualizar os fretes (Somente a empresa) */
  app.get(
    '/freights/company/:company_id',
    {
      onRequest: [verifyJWT, verifyUserProfile('Company')],
    },
    getCompanyFreights,
  )

  //* Visualizar os fretes em andamento/concluídos (Somente o entregador) */
  app.get(
    '/freights/deliverer/:deliverer_id',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    getDelivererFreights,
  )

  //* Visualizar os fretes disponíveis (Somente entregadores) */
  app.get(
    '/freights',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    getAllFreights,
  )

  //* Alterar o status do frete assim que finalizar (Somente entregadores) */
  app.patch(
    '/freight/:freight_id/update',
    { onRequest: verifyUserProfile('Deliverer') },
    update,
  )
}
