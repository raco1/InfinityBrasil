import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

export interface RegisterUseServiceRequest {
  name: string
  email: string
  password: string
  profile: 'Company' | 'Deliverer'
}

interface RegisterUseServiceResponse {
  user: User
}

export class RegisterUseService {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
    profile,
  }: RegisterUseServiceRequest): Promise<RegisterUseServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      profile,
    })

    return { user }
  }
}
