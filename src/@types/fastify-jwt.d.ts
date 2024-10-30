import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      profile: 'Company' | 'Deliverer'
      sub: string
    }
  }
}
