import { User } from '../domain/User'

export interface IUserRepo {
  exists: (userId: string) => Promise<boolean>
  save: (user: User) => Promise<void>
  getUserById: (userId: string) => Promise<User>
}
