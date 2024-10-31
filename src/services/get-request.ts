import { RequestRepository } from '@/repositories/request-repository'
import { Request } from '@prisma/client'

interface GetRequestServiceRequest {
  id: string
}

interface GetRequestServiceResponse {
  request: Request
}

export class GetRequestService {
  constructor(private requestsRepository: RequestRepository) {}

  async execute({
    id,
  }: GetRequestServiceRequest): Promise<GetRequestServiceResponse> {
    const request = await this.requestsRepository.findById(id)

    if (request && request.deliverer_id === id) {
      return {
        request,
      }
    }
    throw new Error('Não há solicitações para você no momento.')
  }
}
