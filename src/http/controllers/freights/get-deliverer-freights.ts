import { GetDelivererFreightsService } from '@/services/get-freights-in-progress-concluded-by-deliverer'
import { UnableToFindFreightsError } from '@/services/errors/unable-to-find-freights-error'
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getDelivererFreights(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { deliverer_id } = request.params as { deliverer_id: string }
  const getDelivererFreightsService = new GetDelivererFreightsService(
    new PrismaFreightsRepository(),
  )

  try {
    const Freights = await getDelivererFreightsService.execute({
      deliverer_id,
    })
    return reply.status(200).send(Freights)
  } catch (error) {
    console.error('Erro ao buscar entregas:', error)
    throw new UnableToFindFreightsError()
  }
}
