import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserProfile(profileToVerify: 'Company' | 'Deliverer') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { profile } = request.user

    if (profile === profileToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
