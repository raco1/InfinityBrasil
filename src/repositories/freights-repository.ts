import { Prisma, Freight } from '@prisma/client'

export interface FreightRepository {
  findById(id: string): Promise<Freight | null>
  findAll(): Promise<Freight[]>
  findManyById(deliverer_id: string): Promise<Freight[]>
  findFreightsByDelivererId(deliverer_id: string): Promise<Freight[] | []>
  findByCompanyId(company_id: string): Promise<Freight | null>
  create(data: Prisma.FreightUncheckedCreateInput): Promise<Freight>
  update(id: string, data: Prisma.FreightUpdateInput): Promise<Freight>
}
