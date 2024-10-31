import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { update } from './update'
import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { register } from './register'

export async function freightsRoutes(app: FastifyInstance) {
  app.post(
    '/freight/register',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    register,
  )
  app.patch('/freight/update', update)
}
