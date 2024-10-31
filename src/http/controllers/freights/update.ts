/* eslint-disable prettier/prettier */
import { PrismaFreightsRepository } from '@/repositories/prisma/prisma-freight-repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { UpdateFreightUseService } from '@/services/update-freight'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  const company_id = request.user.sub

  const updated_at = new Date()
  try {
    const freightsRepository = new PrismaFreightsRepository()

    const updateUseService = new UpdateFreightUseService(freightsRepository)

    await updateUseService.execute({
      company_id,
      status: 'Entregue',
      updated_at,
    })
  } catch (err) {
    throw new InvalidCredentialsError()
  }

  return reply.status(201).send()
}
