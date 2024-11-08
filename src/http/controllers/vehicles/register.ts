import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { CreateVehicleUseService } from '@/services/register-vehicle'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = z.object({
    name: z.string(),
    plate: z.string().max(6),
    year: z.number(),
    type: z.enum(['Caminhonete', 'Furgao', 'Caminhao']),
  })

  const { name, plate, year, type } = createVehicleBodySchema.parse(
    request.body,
  )

  const vehiclesRepository = new PrismaVehiclesRepository()

  const createVehicleUseService = new CreateVehicleUseService(
    vehiclesRepository,
  )
  await createVehicleUseService.execute({
    user_id: request.user.sub,
    name,
    plate,
    year,
    type,
  })

  return reply.status(201).send()
}
