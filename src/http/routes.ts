import { authenticate } from './controllers/authenticate'
import { verifyJWT } from './middlewares/verify-jwt'
import { register } from './controllers/register'
import { profile } from './controllers/profile'
import { FastifyInstance } from 'fastify'
import { update } from './controllers/update'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)

  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.patch('/update', { onRequest: [verifyJWT] }, update)
}
