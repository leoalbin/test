import { db } from 'src/lib/db'

import { Exercise } from '../../domain/Exercise'
import { ExerciseMapper } from '../../mappers/ExerciseMapper'
import { IExerciseRepo } from '../IExerciseRepo'

export class PrismaExercisesRepo implements IExerciseRepo {
  async save(exercise: Exercise): Promise<any> {
    const rawExercise = ExerciseMapper.toPersistence(exercise)
    return db.exercise.upsert({
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

  async getAll(): Promise<Exercise[]> {
    const rawExercises = await db.exercise.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return rawExercises.map((rawExercise) =>
      ExerciseMapper.toDomain(rawExercise)
    )
  }
}
