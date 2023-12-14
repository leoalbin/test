import { Exercise } from '../domain/Exercise'

export interface IExerciseRepo {
  save: (exercise: Exercise) => Promise<void>
  getAll: () => Promise<Exercise[]>
}
