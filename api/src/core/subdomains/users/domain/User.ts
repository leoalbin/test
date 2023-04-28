import { Guard } from 'src/core/shared/core/Result/Guard'
import { Result } from 'src/core/shared/core/Result/Result'
import { AggregateRoot } from 'src/core/shared/domain/AggregateRoot'
import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { Exercise } from '../../exercises/domain/Exercise'

import { UserName } from './UserName'

interface UserProps {
  name: UserName
  exercises?: Exercise[]
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
    this.props.exercises = props.exercises || []
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(props, id)
    return Result.ok<User>(user)
  }

  get id(): UniqueEntityID {
    return this._id
  }

  get name(): UserName {
    return this.props.name
  }

  get exercises(): Exercise[] {
    return this.props.exercises
  }

  public addExercise(exercise: Exercise): Result<void> {
    const guardResult = Guard.greaterThan(this.props.exercises.length + 1, 10)
    if (guardResult.isFailure) {
      return Result.fail<void>('User cannot have more than 10 exercises')
    }
    this.props.exercises.push(exercise)
    return Result.ok<void>()
  }
}
