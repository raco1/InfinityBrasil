import { FreightRepository } from '@/repositories/freights-repository'
import { Freight } from '@prisma/client'

interface CreateFreightUseServiceRequest {
  company_id: string
  distance: number
  status: 'Disponivel' | 'Em_andamento' | 'Entregue'
  can_value_change: boolean
}

interface CreateFreightUseServiceResponse {
  freight: Freight
}

export class CreateFreightUseService {
  constructor(private freightsRepository: FreightRepository) {
    this.freightsRepository = freightsRepository
  }

  async execute({
    company_id,
    distance,
    status,
    can_value_change,
  }: CreateFreightUseServiceRequest): Promise<CreateFreightUseServiceResponse> {
    const freight = await this.freightsRepository.create({
      company_id,
      distance,
      status,
      can_value_change,
    })

    return { freight }
  }
}
