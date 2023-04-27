/* eslint-disable @typescript-eslint/no-namespace */

import { UseCaseError } from 'src/core/shared/application/UseCaseError'
import { Result } from 'src/core/shared/core/Result/Result'

export namespace CreateExerciseErrors {
  export class ExcersiceLimitReached extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The user has reached the limit of exercises`,
      } as UseCaseError)
    }
  }

  export class UserNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      } as UseCaseError)
    }
  }

  export class ExerciseContentTooLong extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The exercise content is too long`,
      } as UseCaseError)
    }
  }
}
