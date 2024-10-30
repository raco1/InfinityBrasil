import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { CreateVehicleUseService } from '@/services/create-vehicle'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createVehicleBodySchema = z.object({
    name: z.string(),
    plate: z.string().max(6),
    year: z.number(),
    capacity: z.number(),
  })

  const { name, plate, year, capacity } = createVehicleBodySchema.parse(
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
    capacity,
  })

  return reply.status(201).send()
}
