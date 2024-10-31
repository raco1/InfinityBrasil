import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { CreateFreightUseService } from '@/services/register-freight'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = z.object({
    distance: z.number(),
    status: z.enum(['Disponivel', 'Em_andamento', 'Entregue']),
    can_value_change: z.boolean().default(true),
  })

  const { distance, status, can_value_change } = createVehicleBodySchema.parse(
    request.body,
  )

  const freightsRepository = new PrismaFreightsRepository()

  const createFreightUseService = new CreateFreightUseService(
    freightsRepository,
  )
  await createFreightUseService.execute({
    company_id: request.user.sub,
    distance,
    status,
    can_value_change,
  })

  return reply.status(201).send()
}
