import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { GetFreightService } from '../get-all-freights'

export function makeGetFreightService() {
  const freightsRepository = new PrismaFreightsRepository()

  const service = new GetFreightService(freightsRepository)

  return service
}
