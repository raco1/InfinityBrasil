import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { GetUserProfileService } from '@/services/get-user-profile'
import { UpdateUseService } from '@/services/update'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PrismaUsersRepository()

  const getUserProfile = new GetUserProfileService(userRepository)

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    old_password: z.string().min(6),
    active: z.boolean(),
  })
  const { name, email, password, old_password, active } =
    updateBodySchema.parse(request.body)

  const update_at = new Date()
  try {
    const usersRepository = new PrismaUsersRepository()

    const updateUseService = new UpdateUseService(usersRepository)

    await updateUseService.execute({
      id: user.id,
      name,
      email,
      password,
      old_password,
      active,
      update_at,
    })
  } catch (err) {
    throw new InvalidCredentialsError()
  }

  return reply.status(201).send()
}
