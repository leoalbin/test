import { Exercise } from '../domain/Exercise'

export interface IExerciseRepo {
  exists: (exerciseId: string) => Promise<boolean>
  save: (exercise: Exercise) => Promise<void>
  getExerciseById: (exerciseId: string) => Promise<Exercise>
  getExercisesByUserId: (userId: string) => Promise<Exercise[]>
}
