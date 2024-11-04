import { UnableToFindFreightsError } from '@/services/errors/unable-to-find-freights-error'
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { GetFreightsByCompanyIdService } from '@/services/get-only-my-company-freights'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getCompanyFreights(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getFreightsByCompanyIdService = new GetFreightsByCompanyIdService(
    new PrismaFreightsRepository(),
  )
  const { company_id } = request.params as { company_id: string }
  try {
    const freights = await getFreightsByCompanyIdService.execute({
      company_id,
    })
    return reply.status(200).send(freights)
  } catch (err) {
    console.error(err)
    throw new UnableToFindFreightsError()
  }
}
