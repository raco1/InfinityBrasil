import { RequestRepository } from '@/repositories/request-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaRequestRepository implements RequestRepository {
  async findById(request_id: string) {
    return prisma.request.findUnique({
      where: { id: request_id },
    })
  }

  async findByDelivererId(deliverer_id: string) {
    const request = await prisma.request.findFirst({
      where: {
        deliverer_id,
      },
    })
    return request
  }

  async findAll() {
    const request = await prisma.request.findMany()
    return request
  }

  async create(data: Prisma.RequestUncheckedCreateInput) {
    const request = await prisma.request.create({
      data,
    })
    return request
  }

  async update(id: string, data: Prisma.RequestUpdateInput) {
    const request = await prisma.request.update({
      where: {
        id,
      },
      data,
    })
    return request
  }
}
