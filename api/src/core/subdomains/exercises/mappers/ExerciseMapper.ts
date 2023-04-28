import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { Exercise } from '../domain/Exercise'

export class ExerciseMapper {
  static toPersistence(exercise) {
    return {
      id: exercise.id.toString(),
      user_id: exercise.userId.toString(),
      content: exercise.content,
      createdAt: exercise.createdAt,
    }
  }
  static toDomain(rawExercise) {
    const exerciseOrError = Exercise.create(
      {
        userId: new UniqueEntityID(rawExercise.user_id),
        content: rawExercise.content,
        createdAt: rawExercise.createdAt,
      },
      new UniqueEntityID(rawExercise.id)
    )
    if (exerciseOrError.isFailure) {
      throw new Error(exerciseOrError.getErrorValue() as unknown as string)
    }
    return exerciseOrError.getValue()
  }
}
