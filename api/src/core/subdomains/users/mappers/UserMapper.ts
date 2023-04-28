import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { ExerciseMapper } from '../../exercises/mappers/ExerciseMapper'
import { User } from '../domain/User'

export class UserMapper {
  static toDomain(rawUser) {
    const userOrError = User.create(
      {
        name: rawUser.name,
        exercises: rawUser.exercises.map((rawExercise) => {
          return ExerciseMapper.toDomain({
            ...rawExercise,
            user: { name: rawUser.name },
          })
        }),
      },
      new UniqueEntityID(rawUser.id)
    )
    if (userOrError.isFailure) {
      throw new Error(userOrError.getErrorValue() as unknown as string)
    }
    return userOrError.getValue()
  }
  static toPersistence(user) {
    return {
      id: user.id.toString(),
      name: user.name.value,
    }
  }
}
