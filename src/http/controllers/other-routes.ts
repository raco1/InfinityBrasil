import { authenticate } from './users/authenticate'
import { relatory } from '@/services/relatory'
import { FastifyInstance } from 'fastify'

export async function otherRoutes(app: FastifyInstance) {
  app.post('/login', authenticate)

  app.get('/report', relatory)
}
