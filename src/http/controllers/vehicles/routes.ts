import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { update } from './update'

export async function vehiclesRoutes(app: FastifyInstance) {
  app.post(
    '/vehicle/register',
    { onRequest: [verifyJWT, verifyUserProfile('Deliverer')] },
    register,
  )
  app.patch('/vehicle/update', update)
}
