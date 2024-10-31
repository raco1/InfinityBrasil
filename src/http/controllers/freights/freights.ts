import { NoFreightsAvailabeError } from '@/services/errors/no-freights-availabe-error'
import { makeGetFreightService } from '@/services/factory/make-get-freight-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function freights(request: FastifyRequest, reply: FastifyReply) {
  const getFreightService = await makeGetFreightService().execute()

  const freights = getFreightService.freight

  const isAvailabe = freights.filter(
    (freight) => freight.status === 'Disponivel',
  )

  try {
    return reply.status(200).send({
      isAvailabe,
    })
  } catch (err) {
    throw new NoFreightsAvailabeError()
  }
}
