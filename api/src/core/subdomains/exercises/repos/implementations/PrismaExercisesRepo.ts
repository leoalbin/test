import { db } from 'src/lib/db'

import { Exercise } from '../../domain/Exercise'
import { ExerciseMapper } from '../../mappers/ExerciseMapper'
import { IExerciseRepo } from '../IExerciseRepo'

export class PrismaExercisesRepo implements IExerciseRepo {
  async save(exercise: Exercise): Promise<void> {
    const rawExercise = await ExerciseMapper.toPersistence(exercise)
    db.exercise.upsert({
      where: {
        id: rawExercise.id,
      },
      update: {
        user_id: rawExercise.user_id,
        content: rawExercise.content,
        created_at: rawExercise.createdAt,
      },
      create: {
        id: rawExercise.id,
        user_id: rawExercise.user_id,
        content: rawExercise.content,
        created_at: rawExercise.createdAt,
      },
    })
  }

  async getExercisesByUserId(userId: string): Promise<Exercise[]> {
    const rawExercises = await db.exercise.findMany({
      where: {
        user_id: userId,
      },
    })

    return rawExercises.map((rawExercise) =>
      ExerciseMapper.toDomain(rawExercise)
    )
  }
}
