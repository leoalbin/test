import { Exercise } from '../domain/Exercise'

export interface IExerciseRepo {
  save: (exercise: Exercise) => Promise<void>
  getExercisesByUserId: (userId: string) => Promise<Exercise[]>
}
