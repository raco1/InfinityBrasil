import { FreightRepository } from '@/repositories/freights-repository'
import { Freight } from '@prisma/client'

interface FetchFreightHistoryServiceRequest {
  deliverer_id: string
}

interface FetchFreightHistoryServiceResponse {
  freight: Freight[]
}

export class FetchFreightHistoryService {
  constructor(private freightRepository: FreightRepository) {}

  async execute({
    deliverer_id,
  }: FetchFreightHistoryServiceRequest): Promise<FetchFreightHistoryServiceResponse> {
    const freight = await this.freightRepository.findManyById(deliverer_id)

    return { freight }
  }
}
