import { InMemoryFreightsRepository } from '@/repositories/in-memory-freights-repository'
import { FetchFreightHistoryService } from './fetch-freight-delivered-history'
import { expect, describe, it, beforeEach } from 'vitest'

let freightRepository: InMemoryFreightsRepository
let sut: FetchFreightHistoryService

describe('Fetch Freight History Service', () => {
  beforeEach(async () => {
    freightRepository = new InMemoryFreightsRepository()
    sut = new FetchFreightHistoryService(freightRepository)
  })
  it('show the history of this one deliverer', async () => {
    await freightRepository.create({
      id: 'freight-1',
      company_id: 'comp-1',
      deliverer_id: 'deliver-1',
      distance: 300,
      value: 50,
      status: 'Entregue',
      posted_at: new Date(),
      can_value_change: false,
      fee: 20,
      updated_at: new Date(),
    })

    await freightRepository.create({
      id: 'freight-2',
      company_id: 'comp-2',
      deliverer_id: 'deliver-1',
      distance: 500,
      value: 100,
      status: 'Entregue',
      posted_at: new Date(),
      can_value_change: false,
      fee: 50,
      updated_at: new Date(),
    })

    const { freight } = await sut.execute({
      deliverer_id: 'deliver-1',
    })
    console.log(freight)
    expect(freight).toHaveLength(2)
    expect(freight).toEqual([
      expect.objectContaining({ id: 'freight-1' }),
      expect.objectContaining({ id: 'freight-2' }),
    ])
  })
})
