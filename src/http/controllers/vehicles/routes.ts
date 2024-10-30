import { verifyUserProfile } from '@/http/middlewares/verify-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createVehicle } from './create-vehicle'
import { FastifyInstance } from 'fastify'
import { update } from './update'

export async function vehiclesRoutes(app: FastifyInstance) {
  app.post(
    '/vehicle/register',
    { onRequest: [verifyJWT, verifyUserProfile('Deliverer')] },
    createVehicle,
  )
  app.patch('/vehicle/update', update)
}
