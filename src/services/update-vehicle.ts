import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { VehicleRepository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'

interface UpdateUseServiceRequest {
  id: string
  name: string
  plate: string
  year: number
  capacity: number
  update_at: Date
}
interface UpdateUseServiceResponse {
  vehicle: Vehicle
}

export class UpdateUseService {
  constructor(private vehiclesRepository: VehicleRepository) {
    this.vehiclesRepository = vehiclesRepository
  }

  async execute({
    id,
    name,
    plate,
    year,
    capacity,
    update_at,
  }: UpdateUseServiceRequest): Promise<UpdateUseServiceResponse> {
    const vehicle = await this.vehiclesRepository.findByPlate(plate)

    if (!vehicle) {
      throw new InvalidCredentialsError()
    }
    if (vehicle && vehicle.id !== id) {
      throw new VehicleAlreadyExistsError()
    }

    vehicle.name = name ?? vehicle.name
    vehicle.plate = plate ?? vehicle.plate
    vehicle.year = year ?? vehicle.year
    vehicle.capacity = capacity ?? vehicle.capacity

    await this.vehiclesRepository.update(plate, {
      name,
      plate,
      year,
      capacity,
      update_at,
    })
    return { vehicle }
  }
}
