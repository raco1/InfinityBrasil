import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseService {
  name: string
  email: string
  password: string
  profile: 'Company' | 'Deliverer'
}

export async function registerUseService({
  name,
  email,
  password,
  profile,
}: RegisterUseService) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      profile,
    },
  })
}
