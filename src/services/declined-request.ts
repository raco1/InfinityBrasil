import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'

interface DeclineDeliveryRequestServiceRequest {
  request_id: string
}

export class DeclineDeliveryRequestService {
  constructor(
    private requestsRepository: PrismaRequestRepository,
    private freightsRepository: PrismaFreightsRepository,
    private vehiclesRepository: PrismaVehiclesRepository,
  ) {}

  async execute({ request_id }: DeclineDeliveryRequestServiceRequest) {
    // Buscar a solicitação de entrega
    const deliveryRequest = await this.requestsRepository.findById(request_id)
    if (!deliveryRequest) throw new Error('Request not found')

    // Buscar o frete associado
    const freight = await this.freightsRepository.findById(
      deliveryRequest.freight_id,
    )
    if (!freight) throw new Error('Freight not found')

    // Buscar o veículo do entregador
    const vehicle = await this.vehiclesRepository.findByDelivererId(
      deliveryRequest.deliverer_id,
    )
    if (!vehicle) throw new Error('Vehicle not found')

    const updated_at = new Date()
    // Atualizar o frete com os novos valores
    return await this.requestsRepository.update(deliveryRequest.id, {
      Status: 'Rejeitado',
      updated_at,
    })
  }
}
