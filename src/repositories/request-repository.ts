import { Prisma, Request } from '@prisma/client'

export interface RequestRepository {
  findById(request_id: string): Promise<Request | null>
  findByDelivererId(deliverer_id: string): Promise<Request | null>
  findAll(): Promise<Request[]>
  create(data: Prisma.RequestUncheckedCreateInput): Promise<Request>
  update(plate: string, data: Prisma.RequestUpdateInput): Promise<Request>
}
