import { PrismaRequestRepository } from '@/repositories/prisma/prisma-request-repository'
import { GetRequestService } from '@/services/get-request'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function requests(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  const requestRepository = new PrismaRequestRepository()

  const getRequestService = new GetRequestService(requestRepository)

  const getRequestAvailabe = await getRequestService.execute({
    id: request.user.sub,
  })

  const requests = getRequestAvailabe.request

  return reply.status(200).send({
    requests,
  })
}
