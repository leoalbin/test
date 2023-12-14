import { UseCase } from 'src/Contexts/Shared/application/UseCase'
import { AppError } from 'src/Contexts/Shared/core/AppError'
import {
  Either,
  Result,
  left,
  right,
} from 'src/Contexts/Shared/core/Result/Result'

import { IUserRepo } from '../../../users/repos/IUserRepo'
import { Exercise } from '../../domain/Exercise'
import { IExerciseRepo } from '../../repos/IExerciseRepo'

export interface ExerciseDTO {
  id: string
  user_id: string
  content: string
  created_at: string
  user: {
    name: string
  }
}

export type GetAllExercisesResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<ExerciseDTO[]>
>

export class GetAllExercisesUseCase
  implements UseCase<void, Promise<GetAllExercisesResponse>>
{
  private userRepo: IUserRepo
  private exerciseRepo: IExerciseRepo

  constructor(userRepo: IUserRepo, exerciseRepo: IExerciseRepo) {
    this.userRepo = userRepo
    this.exerciseRepo = exerciseRepo
  }

  public async execute(): Promise<GetAllExercisesResponse> {
    let exercises: Exercise[]

    try {
      exercises = await this.exerciseRepo.getAll()
      const exercisesDTO: ExerciseDTO[] = exercises.map((exercise) => {
        return {
          id: exercise.id.toString(),
          user_id: exercise.userId.toString(),
          content: exercise.content.value,
          created_at: exercise.createdAt,
          user: {
            name: exercise.user.name.value,
          },
        }
      })
      return right(Result.ok<ExerciseDTO[]>(exercisesDTO))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
