import { db } from 'src/lib/db'

import { User } from '../../domain/User'
import { UserMapper } from '../../mappers/UserMapper'
import { IUserRepo } from '../IUserRepo'

export class PrismaUsersRepo implements IUserRepo {
  async getUserById(userId: string): Promise<User> {
    const rawUser = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        exercises: true,
      },
    })

    if (!rawUser) {
      throw new Error('User not found')
    }

    return UserMapper.toDomain(rawUser)
  }

  async exists(userId: string): Promise<boolean> {
    const rawUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    return !!rawUser
  }

  async save(user: User): Promise<void> {
    const rawUser = await UserMapper.toPersistence(user)

    await db.user.upsert({
      where: {
        id: rawUser.id,
      },
      update: {
        name: rawUser.name,
      },
      create: {
        id: rawUser.id,
        name: rawUser.name,
      },
    })
  }
}
