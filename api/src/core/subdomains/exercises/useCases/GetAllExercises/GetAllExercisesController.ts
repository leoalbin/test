import { BaseController } from 'src/core/shared/infra/BaseController'

import { TextUtils } from '../../../../shared/utils/TextUtils'

import { GetAllExercisesErrors } from './GetAllExercisesErrors'
import {
  ExerciseDTO,
  GetAllExercisesRequest,
  GetAllExercisesUseCase,
  GetAllExercisesResponse,
} from './GetAllExercisesUseCase'

export class GetAllExercisesController extends BaseController {
  private useCase: GetAllExercisesUseCase

  constructor(useCase: GetAllExercisesUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any): Promise<any> {
    let dto: GetAllExercisesRequest = req

    dto = {
      userId: TextUtils.sanitize(dto.userId),
    }

    try {
      const result: GetAllExercisesResponse = await this.useCase.execute(dto)

      if (result.isRight()) {
        const response = result.value.getValue()
        return this.ok<ExerciseDTO[]>(response)
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
