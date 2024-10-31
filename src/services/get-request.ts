import { RequestRepository } from '@/repositories/request-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class GetRequestService {
  constructor(private requestsRepository: RequestRepository) {}

  async execute() {
    const request = await this.requestsRepository.findAll()

    if (!request) {
      throw new ResourceNotFoundError()
    }

    return {
      request,
    }
  }
}
