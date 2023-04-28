import { BaseController } from 'src/core/shared/infra/BaseController'

import { GetAllExercisesErrors } from './GetAllExercisesErrors'
import {
  GetAllExercisesUseCase,
  GetAllExercisesResponse,
} from './GetAllExercisesUseCase'

export class GetAllExercisesController extends BaseController {
  private useCase: GetAllExercisesUseCase

  constructor(useCase: GetAllExercisesUseCase) {
    super()
    this.useCase = useCase
  }

  async execute(): Promise<any> {
    try {
      const result: GetAllExercisesResponse = await this.useCase.execute()
      if (result.isRight()) {
        const response = result.value.getValue()
        console.log('response11', response)
        return response
      }

      if (result.isLeft()) {
        const error = result.value
        switch (error.constructor) {
          case GetAllExercisesErrors.UserNotFound:
            return this.notFound(error.getErrorValue().message)
          default:
            return this.fail(error.getErrorValue().message)
        }
      }

      return this.fail('Something went wrong.')
    } catch (err) {
      return this.fail(err)
    }
  }
}
