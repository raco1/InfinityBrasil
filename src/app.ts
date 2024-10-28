import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    profile: z.enum(['Deliverer', 'Company']),
  })

  const { name, email, password, profile } = registerBodySchema.parse(
    request.body,
  )

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
      profile,
    },
  })

  return reply.status(201).send()
})
