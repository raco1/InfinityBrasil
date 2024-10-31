import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { CreateRequestUseService } from '@/services/register-request'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function registerRequest(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { freight_id } = request.params as { freight_id: string }

  const requestsRepository = new PrismaRequestRepository()
  const freightsRepository = new PrismaFreightsRepository()
  const createRequestUseService = new CreateRequestUseService(
    requestsRepository,
    freightsRepository,
  )

  await createRequestUseService.execute({
    deliverer_id: request.user.sub,
    freight_id,
  })

  return reply.status(201).send()
}
