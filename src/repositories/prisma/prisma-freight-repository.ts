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

  async findManyById(deliverer_id: string) {
    const freights = await prisma.freight.findMany({
      where: {
        deliverer_id,
      },
    })
    return freights
  }

  async findAll() {
    const freight = await prisma.freight.findMany()
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

  async findFreightsByDelivererId(deliverer_id: string) {
    return await prisma.freight.findMany({
      where: {
        deliverer_id,
        status: {
          in: ['Em_andamento', 'Entregue'],
        },
      },
    })
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
