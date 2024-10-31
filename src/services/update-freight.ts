import { FreightRepository } from '@/repositories/freights-repository'
import { Freight } from '@prisma/client'

interface UpdateFreightUseServiceRequest {
  company_id: string
  distance: number
  value: number
  fee: number
  status: 'Disponivel' | 'Em_andamento' | 'Entregue'
  can_value_change: boolean
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
    distance,
    value,
    fee,
    status,
    can_value_change,
    updated_at,
  }: UpdateFreightUseServiceRequest): Promise<UpdateFreightUseServiceResponse> {
    const isFreightExists =
      await this.freightsRepository.findByCompanyId(company_id)

    if (isFreightExists?.status !== 'Disponivel') {
      throw new Error('Não é mais possível realizar mudanças no frente.')
    }

    const freight = await this.freightsRepository.create({
      company_id: isFreightExists.company_id,
      distance,
      value,
      fee,
      status,
      can_value_change,
      updated_at,
    })

    return { freight }
  }
}
