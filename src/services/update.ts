import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { EmailAlreadyBeingUsedError } from './errors/email-already-being-used-error'

interface UpdateUseServiceRequest {
  id: string
  name: string
  email: string
  password: string
  old_password: string
  active: boolean
  updated_at: Date
}
interface UpdateUseServiceResponse {
  user: User
}

export class UpdateUseService {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    id,
    name,
    email,
    password,
    old_password,
    active,
    updated_at,
  }: UpdateUseServiceRequest): Promise<UpdateUseServiceResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new InvalidCredentialsError()
    }
    const checkIfEmailIsBeingUsed =
      await this.usersRepository.findByEmail(email)

    if (checkIfEmailIsBeingUsed && checkIfEmailIsBeingUsed.id !== id) {
      throw new EmailAlreadyBeingUsedError()
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.active = active ?? user.active

    if (password && !old_password) {
      throw new Error(
        'Por favor, insira a senha antiga para definir uma nova senha.',
      )
    }
    if (password && old_password) {
      const checkPasswords = await compare(old_password, password)
      if (!checkPasswords) {
        throw new Error('A senha antiga não confere.')
      }
      if (password === '') {
        password = old_password
      } else {
        user.password_hash = await hash(password, 6)
      }
    }
    await this.usersRepository.update(id, {
      name,
      email,
      active,
      password_hash: user.password_hash,
      updated_at,
    })
    return { user }
  }
}
