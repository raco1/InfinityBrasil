import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'

interface GetDelivererFreightsRequest {
  deliverer_id: string
}

export class GetDelivererFreightsService {
  constructor(private freightsRepository: PrismaFreightsRepository) {}

  async execute({ deliverer_id }: GetDelivererFreightsRequest) {
    const deliveries =
      await this.freightsRepository.findFreightsByDelivererId(deliverer_id)
    return deliveries
  }
}
