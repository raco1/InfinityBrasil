import { FreightRepository } from '@/repositories/freights-repository'
import { Freight } from '@prisma/client'

interface FetchFreightDeliveredYesterdayServiceRequest {
  deliverer_id: string
}

export interface FetchFreightDeliveredYesterdayServiceResponse {
  freights: Freight[]
}

export class FetchFreightDeliveredYesterdayService {
  constructor(private freightRepository: FreightRepository) {}

  async execute({
    deliverer_id,
  }: FetchFreightDeliveredYesterdayServiceRequest): Promise<FetchFreightDeliveredYesterdayServiceResponse> {
    const allFreights = await this.freightRepository.findManyById(deliverer_id)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const startOfDay = new Date(yesterday.setHours(0, 0, 0, 0))
    const endOfDay = new Date(yesterday.setHours(23, 59, 59, 999))

    const deliveredFreights = allFreights.filter(
      (freight: Freight) =>
        freight.status === 'Entregue' &&
        freight.updated_at >= startOfDay &&
        freight.updated_at <= endOfDay,
    )

    return { freights: deliveredFreights }
  }
}
