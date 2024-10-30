import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileService } from '@/services/get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PrismaUsersRepository()

  const getUserProfile = new GetUserProfileService(userRepository)

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  console.log(request.user.sub, user)
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
