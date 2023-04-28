import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { User } from '../../../users/domain/User'
import { UserName } from '../../../users/domain/UserName'
import { Exercise } from '../../domain/Exercise'
import { ExerciseContent } from '../../domain/ExerciseContent'
import { IExerciseRepo } from '../../repos/IExerciseRepo'
import { IUserRepo } from '../../../users/repos/IUserRepo'

import { GetAllExercisesUseCase } from './GetAllExercisesUseCase'

describe('GetAllExercises', () => {
  test('Given a userId retrieve all exercises related', async () => {
    const userId = '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22'

    const exercises = [
      {
        id: 'e8db8fe0-e0bf-4fff-87d0-1ed369b6acd0',
        user_id: userId,
        content: 'Sample Exercise',
        created_at: '2021-06-11T02:17:32-07:00',
        user: {
          name: 'Foo Bar',
        },
      },
      {
        id: '14a1ab60-2a17-4afb-818b-8f7386196414',
        user_id: userId,
        content: 'Another Exercise',
        created_at: '2021-06-11T02:17:32-07:00',
        user: {
          name: 'Foo Bar',
        },
      },
    ]

    const exercisesRepositoryMock: IExerciseRepo = {
      getAll() {
        return exercises.map((exercise) =>
          Exercise.create(
            {
              userId: new UniqueEntityID(exercise.user_id),
              user: User.create(
                {
                  name: UserName.create({
                    name: exercise.user.name,
                  }).getValue(),
                },
                new UniqueEntityID(exercise.user_id)
              ).getValue(),
              content: ExerciseContent.create({
                content: exercise.content,
              }).getValue(),
              createdAt: exercise.created_at,
            },
            new UniqueEntityID(exercise.id)
          ).getValue()
        )
      },
    } as unknown as IExerciseRepo

    const usersRepositoryMock: IUserRepo = {
      getUserById() {
        return User.create(
          {
            name: UserName.create({
              name: 'Foo Bar',
            }).getValue(),
          },
          new UniqueEntityID('1fd9b205-6aa3-41e5-8cbd-54bfe3753c22')
        ).getValue()
      },
    } as unknown as IUserRepo

    const getAllExercises = new GetAllExercisesUseCase(
      usersRepositoryMock,
      exercisesRepositoryMock
    )
    const result = await getAllExercises.execute()

    expect(result.isRight()).toBe(true)

    expect(result.value.getValue()).toStrictEqual([
      {
        content: 'Sample Exercise',
        created_at: '2021-06-11T02:17:32-07:00',
        id: 'e8db8fe0-e0bf-4fff-87d0-1ed369b6acd0',
        user: { name: 'Foo Bar' },
        user_id: '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22',
      },
      {
        content: 'Another Exercise',
        created_at: '2021-06-11T02:17:32-07:00',
        id: '14a1ab60-2a17-4afb-818b-8f7386196414',
        user: { name: 'Foo Bar' },
        user_id: '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22',
      },
    ])
  })
})
