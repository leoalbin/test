import { Guard } from 'src/core/shared/core/Result/Guard'
import { Result } from 'src/core/shared/core/Result/Result'

import { ValueObject } from '../../../shared/domain/ValueObject'

interface UserNameProps {
  name: string
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 15
  public static minLength = 2

  get value(): string {
    return this.props.name
  }

  private constructor(props: UserNameProps) {
    super(props)
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'username')
    if (usernameResult.isFailure) {
      return Result.fail<UserName>(usernameResult.getErrorValue())
    }

    return Result.ok<UserName>(new UserName(props))
  }
}
