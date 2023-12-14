import { UniqueEntityID } from 'src/Contexts/Shared/domain/UniqueEntityId'

import { User } from '../../users/domain/User'
import { UserName } from '../../users/domain/UserName'
import { Exercise } from '../domain/Exercise'
import { ExerciseContent } from '../domain/ExerciseContent'

export class ExerciseMapper {
  static toPersistence(exercise: Exercise) {
    return {
      id: exercise.id.toString(),
      user_id: exercise.userId.toString(),
      content: exercise.content.value,
      createdAt: exercise.createdAt,
    }
  }
  static toDomain(rawExercise): Exercise {
    const exerciseOrError = Exercise.create(
      {
        userId: new UniqueEntityID(rawExercise.user_id),
        user: User.create(
          {
            name: UserName.create({
              name: rawExercise.user.name,
            }).getValue(),
          },
          new UniqueEntityID(rawExercise.user.id)
        ).getValue(),
        content: ExerciseContent.create({
          content: rawExercise.content,
        }).getValue(),
        createdAt: rawExercise.created_at,
      },
      new UniqueEntityID(rawExercise.id)
    )
    if (exerciseOrError.isFailure) {
      throw new Error(exerciseOrError.getErrorValue() as unknown as string)
    }
    return exerciseOrError.getValue()
  }
}
