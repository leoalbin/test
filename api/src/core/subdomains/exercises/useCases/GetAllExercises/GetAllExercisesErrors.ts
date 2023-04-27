/* eslint-disable @typescript-eslint/no-namespace */

import { UseCaseError } from 'src/core/shared/application/UseCaseError'
import { Result } from 'src/core/shared/core/Result/Result'

export namespace GetAllExercisesErrors {
  export class UserNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      } as UseCaseError)
    }
  }
}
