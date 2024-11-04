import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { VehicleType } from '@/@types/vehicle-type'

export class AcceptDeliveryRequestService {
  constructor(
    private requestsRepository: PrismaRequestRepository,
    private freightsRepository: PrismaFreightsRepository,
    private vehiclesRepository: PrismaVehiclesRepository,
  ) {}

  async execute(id: string) {
    console.log(id, 'oi')
    // Buscar a solicitação de entrega
    const deliveryRequest = await this.requestsRepository.findById(id)
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

    // Calcular o valor e a taxa

    const { distance } = freight
    const { type: vehicleType } = vehicle

    let rate: number

    if (distance <= 100) {
      rate = 0.2 // 20%
    } else if (distance <= 200) {
      rate = 0.15 // 15%
    } else if (distance <= 500) {
      rate = 0.1 // 10%
    } else {
      rate = 0.075 // 7.5%
    }
    switch (vehicleType) {
      case VehicleType.CAMINHONETE:
        freight.value = distance * 5
        freight.fee = freight.value * rate
        break
      case VehicleType.FURGAO:
        freight.value = distance * 4
        freight.fee = freight.value * rate
        break
      case VehicleType.CAMINHAO:
        freight.value = distance * 10
        freight.fee = freight.value * rate
        break
      default:
        throw new Error('Tipo de veículo inválido')
    }
    // Atualizar o frete com os novos valores
    const freightUpdated = await this.freightsRepository.update(freight.id, {
      deliverer_id: deliveryRequest.deliverer_id,
      value: freight.value,
      fee: freight.fee,
      can_value_change: false,
      status: 'Em_andamento',
      updated_at,
    })

    const requestUpdated = await this.requestsRepository.update(
      deliveryRequest.id,
      {
        Status: 'Aceito',
      },
    )

    return { freightUpdated, requestUpdated }
  }
}
