import { RegisterUseService } from './register'
import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
  it('should hash user password upon registration', async () => {
    const registerUseService = new RegisterUseService({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findByEmail(_email) {
        return null
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findById(_id) {
        return null
      },

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async update(_id, _data) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          profile: 'Company',
          active: true,
          created_at: new Date(),
          update_at: new Date(),
        }
      },
    })

    const { user } = await registerUseService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      profile: 'Company',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
