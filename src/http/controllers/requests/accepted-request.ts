import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { AcceptDeliveryRequestService } from '@/services/accepted-request'

export async function acceptDeliveryRequest(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { request_id } = request.params as { request_id: string }

  // Instanciar os repositórios e o serviço
  const requestsRepository = new PrismaRequestRepository()
  const freightsRepository = new PrismaFreightsRepository()
  const vehiclesRepository = new PrismaVehiclesRepository()

  const acceptDeliveryRequestService = new AcceptDeliveryRequestService(
    requestsRepository,
    freightsRepository,
    vehiclesRepository,
  )
  try {
    // Executar o serviço e obter a resposta
    const { value, fee, status, can_value_change } =
      await acceptDeliveryRequestService.execute({
        request_id,
      })
    return reply.status(200).send({ value, fee, status, can_value_change })
  } catch (err) {
    console.log()
    return reply.status(404).send()
  }
}
