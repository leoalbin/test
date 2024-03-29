import { UseCase } from 'src/Contexts/Shared/application/UseCase'
import { AppError } from 'src/Contexts/Shared/core/AppError'
import { Either, Result, left, right } from 'src/Contexts/Shared/core/Result/Result'

import { Exercise } from '../../domain/Exercise'
import { ExerciseContent } from '../../domain/ExerciseContent'
import { User } from '../../../users/domain/User'
import { IExerciseRepo } from '../../repos/IExerciseRepo'
import { IUserRepo } from '../../../users/repos/IUserRepo'

import { CreateExerciseErrors } from './CreateExerciseErrors'

export interface CreateExerciseDTO {
  userId: string
  content: string
}

export type CreateExerciseResponse = Either<
  CreateExerciseErrors.UserNotFound | AppError.UnexpectedError | Result<any>,
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
    } catch (e) {
      console.log('e', e)
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
      user: user,
      content: newExcerciseContent,
      createdAt: new Date().toISOString(),
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
