import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists-error'
import { VehicleRepository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'

interface CreateVehicleUseServiceRequest {
  user_id: string
  name: string
  plate: string
  year: number
  capacity: number
}

interface CreateVehicleUseServiceResponse {
  vehicle: Vehicle
}

export class CreateVehicleUseService {
  constructor(private vehiclesRepository: VehicleRepository) {
    this.vehiclesRepository = vehiclesRepository
  }

  async execute({
    user_id,
    name,
    plate,
    year,
    capacity,
  }: CreateVehicleUseServiceRequest): Promise<CreateVehicleUseServiceResponse> {
    const existingVehicle = await this.vehiclesRepository.findByPlate(plate)

    if (existingVehicle !== null && existingVehicle.plate) {
      throw new VehicleAlreadyExistsError()
    }

    const vehicle = await this.vehiclesRepository.create({
      user_id,
      name,
      plate,
      year,
      capacity,
    })

    return { vehicle }
  }
}
