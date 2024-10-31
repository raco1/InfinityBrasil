import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { register } from './register'
import { freights } from './freights'
import { registerRequest } from '../requests/register'
import { acceptDeliveryRequest } from '../requests/accepted-request'

export async function freightsRoutes(app: FastifyInstance) {
  app.post(
    '/freight/register',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    register,
  )
  app.patch(
    '/freight/requests/:request_id/accept',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    acceptDeliveryRequest,
  )
  app.post(
    '/freight/:freight_id/request',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    registerRequest,
  )

  app.get(
    '/freights',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    freights,
  )
}
