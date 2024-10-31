import { VehicleType } from '@/@types/vehicle-type'

export function CalculateFee(
  distance: number,
  value: number,
  fee: number,
  vehicleType: VehicleType,
) {
  let rate: number

  if (distance <= 100) {
    rate = 0.2 // 20%
  } else if (distance <= 200) {
    rate = 0.15 // 15%
  } else if (distance <= 500) {
    rate = 0.1 // 10%
  } else {
    rate = 0.075 // 7.5%
  }
  switch (vehicleType) {
    case VehicleType.CAMINHONETE:
      value = distance * 5
      fee = value * rate
      return { value, fee }
    case VehicleType.FURGAO:
      value = distance * 4
      fee = value * rate
      return { value, fee }
    case VehicleType.CAMINHAO:
      value = distance * 10
      fee = value * rate
      return { value, fee }
    default:
      throw new Error('Tipo de veículo inválido')
  }
}
