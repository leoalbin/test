import { Result } from 'src/core/shared/core/Result/Result'
import { Entity } from 'src/core/shared/domain/Entity'
import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { User } from '../../users/domain/User'

import { ExerciseContent } from './ExerciseContent'

interface ExerciseProps {
  userId: UniqueEntityID
  user?: User
  content: ExerciseContent
  createdAt: string
}

export class Exercise extends Entity<ExerciseProps> {
  constructor(props: ExerciseProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(
    props: ExerciseProps,
    id?: UniqueEntityID
  ): Result<Exercise> {
    const exercise = new Exercise(props, id)
    return Result.ok<Exercise>(exercise)
  }

  get id(): UniqueEntityID {
    return this._id
  }

  get userId(): UniqueEntityID {
    return this.props.userId
  }

  get user(): User {
    return this.props.user
  }

  get content(): ExerciseContent {
    return this.props.content
  }

  get createdAt(): string {
    return this.props.createdAt
  }
}
