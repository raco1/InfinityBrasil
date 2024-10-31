import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { FreightRepository } from '@/repositories/freights-repository'

export class GetFreightService {
  constructor(private freightsRepository: FreightRepository) {}

  async execute() {
    const freight = await this.freightsRepository.findAll()

    if (!freight) {
      throw new ResourceNotFoundError()
    }

    return {
      freight,
    }
  }
}
