import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { update } from './update'
import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { register } from './register'
import { freights } from './freights'
import { registerRequest } from '../requests/register'

export async function freightsRoutes(app: FastifyInstance) {
  app.post(
    '/freight/register',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    register,
  )

  app.post(
    '/freight/:freight_id/request',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    registerRequest,
  )
  app.patch('/freight/update', update)

  app.get(
    '/freights',
    {
      onRequest: [verifyJWT, verifyUserProfile('Deliverer')],
    },
    freights,
  )
}
