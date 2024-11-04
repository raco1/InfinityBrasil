import { makeGetUserProfileService } from '@/services/factory/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserProfile(profileToVerify: 'Company' | 'Deliverer') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
    const getUserProfile = makeGetUserProfileService()
    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })
    if (user.profile !== profileToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}

// Tentar entender o porquê antes estava retornando undefined
