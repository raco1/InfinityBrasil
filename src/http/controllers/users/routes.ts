import { authenticate } from '@/http/controllers/users/authenticate'
import { register } from '@/http/controllers/users/register'
import { profile } from '@/http/controllers/users/profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { update } from '@/http/controllers/users/update'
import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)

  app.post('/register', register)

  app.patch('/update', update)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
