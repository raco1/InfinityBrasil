import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { UpdateUseService } from '@/services/update-vehicle'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    plate: z.string().max(6),
    year: z.number(),
    type: z.enum(['Caminhonete', 'Furgao', 'Caminhao']),
  })
  const { name, plate, year, type } = updateBodySchema.parse(request.body)

  const updated_at = new Date()
  try {
    const vehiclesRepository = new PrismaVehiclesRepository()

    const updateUseService = new UpdateUseService(vehiclesRepository)

    await updateUseService.execute({
      name,
      plate,
      year,
      type,
      updated_at,
    })
  } catch (err) {
    throw new InvalidCredentialsError()
  }

  return reply.status(201).send()
}
