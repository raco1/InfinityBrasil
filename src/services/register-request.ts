import { FreightRepository } from '@/repositories/freights-repository'
import { RequestRepository } from '@/repositories/request-repository'
import { Request } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateRequestUseServiceRequest {
  deliverer_id: string
  freight_id: string
}

interface CreateRequestUseServiceResponse {
  request: Request
}

export class CreateRequestUseService {
  constructor(
    private requestsRepository: RequestRepository,
    private freightsRepository: FreightRepository,
  ) {
    this.requestsRepository = requestsRepository
    this.freightsRepository = freightsRepository
  }

  async execute({
    deliverer_id,
    freight_id,
  }: CreateRequestUseServiceRequest): Promise<CreateRequestUseServiceResponse> {
    const freight = await this.freightsRepository.findById(freight_id)

    if (!freight) {
      throw new ResourceNotFoundError()
    }
    if (freight.status !== 'Disponivel') {
      throw new Error('Frete indisponível para solicitações.')
    }
    const request = await this.requestsRepository.create({
      deliverer_id,
      freight_id,
    })

    return { request }
  }
}
