import { FastifyInstance } from 'fastify'

import { requests } from './requests'
import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function requestsRoutes(app: FastifyInstance) {
  app.get(
    '/requests',
    { onRequest: [verifyJWT, verifyUserProfile('Company')] },
    requests,
  )
}
