import { Guard } from 'src/Contexts/Shared/core/Result/Guard'
import { Result } from 'src/Contexts/Shared/core/Result/Result'

import { ValueObject } from 'src/Contexts/Shared/domain/ValueObject'

interface ExerciseContentProps {
  content: string
}

export class ExerciseContent extends ValueObject<ExerciseContentProps> {
  public static maxLength = 100

  get value(): string {
    return this.props.content
  }

  private constructor(props: ExerciseContentProps) {
    super(props)
  }

  public static create(props: ExerciseContentProps): Result<ExerciseContent> {
    const exerciseContentResult = Guard.againstNullOrUndefined(
      props.content,
      'content'
    )

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.content)
    if (maxLengthResult.isFailure) {
      return Result.fail<ExerciseContent>(maxLengthResult.getErrorValue())
    }

    if (exerciseContentResult.isFailure) {
      return Result.fail<ExerciseContent>(exerciseContentResult.getErrorValue())
    }

    return Result.ok<ExerciseContent>(new ExerciseContent(props))
  }
}
