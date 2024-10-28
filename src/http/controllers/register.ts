import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
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

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
        email
    }
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      profile,
    },
  })

  return reply.status(201).send()
}
