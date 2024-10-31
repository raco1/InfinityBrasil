import { VehicleRepository } from '../vehicles-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaVehiclesRepository implements VehicleRepository {
  async findByPlate(plate: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    })
    return vehicle
  }

  async findByDelivererId(user_id: string) {
    return prisma.vehicle.findFirst({
      where: {
        user_id,
      },
    })
  }

  async findById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    })
    return vehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })
    return vehicle
  }

  async update(plate: string, data: Prisma.VehicleUpdateInput) {
    const vehicle = await prisma.vehicle.update({
      where: {
        plate,
      },
      data,
    })
    return vehicle
  }
}
