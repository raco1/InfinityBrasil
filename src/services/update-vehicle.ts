import { PlateAlreadyBeingUsedError } from './errors/plate-already-being-used-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { VehicleRepository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'

interface UpdateUseServiceRequest {
  name: string
  plate: string
  year: number
  type: 'Caminhonete' | 'Furgao' | 'Caminhao'
  updated_at: Date
}
interface UpdateUseServiceResponse {
  vehicle: Vehicle
}

export class UpdateUseService {
  constructor(private vehiclesRepository: VehicleRepository) {
    this.vehiclesRepository = vehiclesRepository
  }

  async execute({
    name,
    plate,
    year,
    type,
    updated_at,
  }: UpdateUseServiceRequest): Promise<UpdateUseServiceResponse> {
    const vehicle = await this.vehiclesRepository.findByPlate(plate)

    if (!vehicle) {
      throw new InvalidCredentialsError()
    }
    if (vehicle && vehicle.plate !== plate) {
      throw new PlateAlreadyBeingUsedError()
    }

    vehicle.name = name ?? vehicle.name
    vehicle.plate = plate ?? vehicle.plate
    vehicle.year = year ?? vehicle.year
    vehicle.type = type ?? vehicle.type

    await this.vehiclesRepository.update(plate, {
      name,
      plate,
      year,
      type,
      updated_at,
    })
    return { vehicle }
  }
}
