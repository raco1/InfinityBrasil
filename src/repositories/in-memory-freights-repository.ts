import { FreightRepository } from '@/repositories/freights-repository'
import { Prisma, StatusFreight } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryFreightsRepository implements FreightRepository {
  public items: Array<{
    id: string
    company_id: string
    deliverer_id: string | null
    distance: number
    value: number | null
    status: StatusFreight
    posted_at: Date
    can_value_change: boolean
    fee: number | null
    updated_at: Date
  }> = []

  async findById(id: string) {
    const freight = this.items.find((item) => item.id === id)

    if (!freight) {
      return null
    }

    return freight
  }

  async findManyById(deliverer_id: string) {
    const freight = this.items.filter(
      (item) => item.deliverer_id === deliverer_id,
    )

    return freight
  }

  async findAll() {
    return this.items
  }

  async findByCompanyId(company_id: string) {
    const freight = this.items.find(
      (freight) => freight.company_id === company_id,
    )
    return freight || null
  }

  async findFreightsByDelivererId(deliverer_id: string) {
    return this.items.filter(
      (freight) =>
        freight.deliverer_id === deliverer_id &&
        (freight.status === 'Em_andamento' || freight.status === 'Entregue'),
    )
  }

  async create(data: Prisma.FreightUncheckedCreateInput) {
    const freight = {
      id: data.id ?? randomUUID(),
      company_id: data.company_id,
      deliverer_id: data.deliverer_id ?? null,
      distance: data.distance,
      value: data.value ?? null,
      status: StatusFreight.Entregue,
      posted_at: new Date(),
      can_value_change: true,
      fee: data.fee ?? null,
      updated_at: new Date(),
    }

    this.items.push(freight)
    return freight
  }

  async update(id: string, data: Prisma.FreightUpdateInput) {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    user.deliverer_id =
      typeof data.deliverer_id === 'string'
        ? data.deliverer_id
        : user.deliverer_id
    user.distance =
      typeof data.distance === 'number' ? data.distance : user.distance
    user.value = typeof data.value === 'number' ? data.value : user.value
    user.status = typeof data.status === 'number' ? data.status : user.status
    user.posted_at = new Date()
    user.can_value_change =
      typeof data.can_value_change === 'boolean'
        ? data.can_value_change
        : user.can_value_change
    user.fee = typeof data.fee === 'number' ? data.fee : user.fee
    user.updated_at = new Date()
    return user
  }
}
