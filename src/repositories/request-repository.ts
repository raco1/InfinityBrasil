import { Prisma, Request } from '@prisma/client'

export interface RequestRepository {
  findById(deliverer_id: string): Promise<Request | null>
  create(data: Prisma.RequestUncheckedCreateInput): Promise<Request>
  update(plate: string, data: Prisma.RequestUpdateInput): Promise<Request>
}
