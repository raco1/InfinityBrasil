import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'

interface GetFreightsByCompanyIdRequest {
  company_id: string
}

export class GetFreightsByCompanyIdService {
  constructor(private freightsRepository: PrismaFreightsRepository) {}

  async execute({ company_id }: GetFreightsByCompanyIdRequest) {
    const freights = await this.freightsRepository.findByCompanyId(company_id)
    return freights
  }
}
