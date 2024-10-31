/* eslint-disable prettier/prettier */
import { FreightRepository } from '@/repositories/freights-repository'
import { Freight } from '@prisma/client'

interface UpdateFreightUseServiceRequest {
  company_id: string
  status: 'Disponivel' | 'Em_andamento' | 'Entregue'
  updated_at: Date
}

interface UpdateFreightUseServiceResponse {
  freight: Freight
}

export class UpdateFreightUseService {
  constructor(private freightsRepository: FreightRepository) {
    this.freightsRepository = freightsRepository
  }

  async execute({
    company_id,
    status,
    updated_at,
  }: UpdateFreightUseServiceRequest): Promise<UpdateFreightUseServiceResponse> {

    const freight = await this.freightsRepository.update(company_id, {
      status,
      updated_at,
    })

    return { freight }
  }
}
