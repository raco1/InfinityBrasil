import { FreightRepository } from '@/repositories/freights-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaFreightsRepository implements FreightRepository {
  async findById(id: string) {
    const freight = await prisma.freight.findUnique({
      where: {
        id,
      },
    })
    return freight
  }

  async findByCompanyId(company_id: string) {
    const company = await prisma.freight.findFirst({
      where: {
        company_id,
      },
    })
    return company
  }

  async create(data: Prisma.FreightUncheckedCreateInput) {
    const freight = await prisma.freight.create({
      data,
    })
    return freight
  }

  async update(id: string, data: Prisma.FreightUpdateInput) {
    const freight = await prisma.freight.update({
      where: {
        id,
      },
      data,
    })
    return freight
  }
}
