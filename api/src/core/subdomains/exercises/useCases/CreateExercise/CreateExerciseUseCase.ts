import { UseCase } from 'src/core/shared/application/UseCase'
import { AppError } from 'src/core/shared/core/AppError'
import { Either, Result, left, right } from 'src/core/shared/core/Result/Result'

import { Exercise } from '../../domain/Exercise'
import { ExerciseContent } from '../../domain/ExerciseContent'
import { User } from '../../domain/User'
import { IExerciseRepo } from '../../repos/IExerciseRepo'
import { IUserRepo } from '../../repos/IUserRepo'

import { CreateExerciseErrors } from './CreateExerciseErrors'

interface CreateExerciseDTO {
  userId: string
  content: string
}

type CreateExerciseResponse = Either<
  | CreateExerciseErrors.ExcersiceLimitReached
  | CreateExerciseErrors.UserNotFound
  | CreateExerciseErrors.ExerciseContentTooLong
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>

export class CreateExerciseUseCase
  implements UseCase<CreateExerciseDTO, Promise<CreateExerciseResponse>>
{
  private userRepo: IUserRepo
  private exerciseRepo: IExerciseRepo

  constructor(userRepo: IUserRepo, exerciseRepo: IExerciseRepo) {
    this.userRepo = userRepo
    this.exerciseRepo = exerciseRepo
  }

  public async execute(
    request: CreateExerciseDTO
  ): Promise<CreateExerciseResponse> {
    let user: User
    let newExcerciseContent: ExerciseContent
    let newExcercise: Exercise

    try {
      user = await this.userRepo.getUserById(request.userId)
    } catch {
      return left(new CreateExerciseErrors.UserNotFound())
    }

    const newExcersiceContentOrError = ExerciseContent.create({
      content: request.content,
    })

    if (newExcersiceContentOrError.isFailure) {
      return left(newExcersiceContentOrError)
    }
    // eslint-disable-next-line prefer-const
    newExcerciseContent = newExcersiceContentOrError.getValue()

    const newExcerciseOrError = Exercise.create({
      userId: user.id,
      content: newExcerciseContent,
      createdAt: new Date(),
    })
    if (newExcerciseOrError.isFailure) {
      return left(newExcerciseOrError)
    }
    // eslint-disable-next-line prefer-const
    newExcercise = newExcerciseOrError.getValue()

    const addExerciseResult = user.addExercise(newExcercise)
    if (addExerciseResult.isFailure) {
      return left(addExerciseResult)
    }

    try {
      await this.exerciseRepo.save(newExcercise)
    } catch (e) {
      return left(new AppError.UnexpectedError(e))
    }

    return right(Result.ok<void>())
  }
}
