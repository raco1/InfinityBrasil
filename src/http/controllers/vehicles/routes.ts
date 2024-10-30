import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createVehicle } from './create-vehicle'
import { FastifyInstance } from 'fastify'

export async function vehiclesRoutes(app: FastifyInstance) {
  app.post(
    '/createVehicle',
    { onRequest: [verifyJWT, verifyUserProfile('Deliverer')] },
    createVehicle,
  )
}
