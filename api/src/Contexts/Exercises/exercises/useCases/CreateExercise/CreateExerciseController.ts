import { BaseController } from 'src/Contexts/Shared/infra/BaseController'

import { TextUtils } from 'src/Contexts/Shared/utils/TextUtils'

import { CreateExerciseErrors } from './CreateExerciseErrors'
import {
  CreateExerciseDTO,
  CreateExerciseUseCase,
  CreateExerciseResponse,
} from './CreateExerciseUseCase'

export class CreateExerciseController extends BaseController {
  private useCase: CreateExerciseUseCase

  constructor(useCase: CreateExerciseUseCase) {
    super()
    this.useCase = useCase
  }

  async execute(req: any): Promise<any> {
    let dto: CreateExerciseDTO = req

    dto = {
      userId: TextUtils.sanitize(dto.userId),
      content: TextUtils.sanitize(dto.content),
    }

    try {
      const result: CreateExerciseResponse = await this.useCase.execute(dto)
      if (result.isRight()) {
        const response = result.value.getValue()
        return this.ok<void>(response)
      }

      if (result.isLeft()) {
        const error = result.value
        switch (error.constructor) {
          case CreateExerciseErrors.UserNotFound:
            return this.notFound(result.value.getErrorValue().message)
          default:
            return this.fail(result.value.getErrorValue())
        }
      }

      return this.fail('Something went wrong.')
    } catch (err) {
      return this.fail(err)
    }
  }
}
