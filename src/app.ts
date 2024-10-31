import { vehiclesRoutes } from './http/controllers/vehicles/routes'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import fastify from 'fastify'
import { env } from './env'
import { freightsRoutes } from './http/controllers/freights/route'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(vehiclesRoutes)
app.register(freightsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui devemos registrar em uma ferramenta experimental como o Datalok/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal Server Error' })
})
