import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseServiceRequest {
  name: string
  email: string
  password: string
  profile: 'Company' | 'Deliverer'
}

export class RegisterUseService {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password, profile }: RegisterUseServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
      profile,
    })
  }
}
