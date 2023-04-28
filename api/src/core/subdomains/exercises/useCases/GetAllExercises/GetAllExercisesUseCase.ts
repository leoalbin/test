import { UseCase } from 'src/core/shared/application/UseCase'
import { AppError } from 'src/core/shared/core/AppError'
import { Either, Result, left, right } from 'src/core/shared/core/Result/Result'

import { Exercise } from '../../domain/Exercise'
import { User } from '../../domain/User'
import { IExerciseRepo } from '../../repos/IExerciseRepo'
import { IUserRepo } from '../../repos/IUserRepo'

import { GetAllExercisesErrors } from './GetAllExercisesErrors'

export interface GetAllExercisesRequest {
  userId: string
}

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
  GetAllExercisesErrors.UserNotFound | AppError.UnexpectedError | Result<any>,
  Result<ExerciseDTO[]>
>

export class GetAllExercisesUseCase
  implements UseCase<GetAllExercisesRequest, Promise<GetAllExercisesResponse>>
{
  private userRepo: IUserRepo
  private exerciseRepo: IExerciseRepo

  constructor(userRepo: IUserRepo, exerciseRepo: IExerciseRepo) {
    this.userRepo = userRepo
    this.exerciseRepo = exerciseRepo
  }

  public async execute(
    request: GetAllExercisesRequest
  ): Promise<GetAllExercisesResponse> {
    let user: User
    let exercises: Exercise[]

    try {
      user = await this.userRepo.getUserById(request.userId)
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }

    try {
      exercises = await this.exerciseRepo.getExercisesByUserId(request.userId)
      const exercisesDTO: ExerciseDTO[] = exercises.map((exercise) => {
        return {
          id: exercise.id.toString(),
          user_id: exercise.userId.toString(),
          content: exercise.content.value,
          created_at: exercise.createdAt.toISOString(),
          user: {
            name: user.name.value,
          },
        }
      })

      return right(Result.ok<ExerciseDTO[]>(exercisesDTO))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
