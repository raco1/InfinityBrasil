import { registerUseService } from '@/services/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    profile: z.enum(['Deliverer', 'Company']),
  })

  const { name, email, password, profile } = registerBodySchema.parse(
    request.body,
  )

  try {
    await registerUseService({
      name,
      email,
      password,
      profile,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
