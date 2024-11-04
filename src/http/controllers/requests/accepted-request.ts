import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { AcceptDeliveryRequestService } from '@/services/accepted-request'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function acceptDeliveryRequest(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

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
    await acceptDeliveryRequestService.execute(id)
    return reply.status(200).send()
  } catch (err) {
    console.log(err, id)
    return reply.status(404).send()
  }
}
