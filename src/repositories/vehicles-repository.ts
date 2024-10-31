import { Prisma, Vehicle } from '@prisma/client'

export interface VehicleRepository {
  findByPlate(plate: string): Promise<Vehicle | null>
  findById(id: string): Promise<Vehicle | null>
  findByDelivererId(deliverer_id: string): Promise<Vehicle | null>
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
  update(plate: string, data: Prisma.VehicleUpdateInput): Promise<Vehicle>
}
