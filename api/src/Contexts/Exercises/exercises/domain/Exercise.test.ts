import { UniqueEntityID } from 'src/Contexts/Shared/domain/UniqueEntityId'

import { User } from '../../users/domain/User'
import { UserName } from '../../users/domain/UserName'

import { Exercise } from './Exercise'
import { ExerciseContent } from './ExerciseContent'

describe('Exercise', () => {
  test('Given a valid set of properties an instance of an Exercise is created', () => {
    const userId = new UniqueEntityID('fsdfan45h')
    const exerciseId = new UniqueEntityID('3248asjhf')

    const exercise = Exercise.create(
      {
        userId: userId,
        user: User.create(
          {
            name: UserName.create({ name: 'John Doe' }).getValue(),
          },
          userId
        ).getValue(),
        content: ExerciseContent.create({ content: 'Hello World' }).getValue(),
        createdAt: '2021-01-01',
      },
      exerciseId
    )

    expect(exercise.isSuccess).toBe(true)
    expect(exercise.getValue()).toBeInstanceOf(Exercise)
    expect(exercise.getValue().id.toString()).toBe('3248asjhf')
    expect(exercise.getValue().userId.toString()).toBe('fsdfan45h')
    expect(exercise.getValue().user).toBeInstanceOf(User)
  })
})
