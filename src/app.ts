import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Rafael Coelho',
    email: 'rafael@email.com',
    password: 'senha123',
    profile: 'Deliverer',
  },
})
