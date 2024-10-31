import { RequestRepository } from '@/repositories/request-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaRequestRepository implements RequestRepository {
  async findById(deliverer_id: string) {
    const request = await prisma.request.findFirst({
      where: {
        deliverer_id,
      },
    })
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
