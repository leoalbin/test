import { UniqueEntityID } from 'src/core/shared/domain/UniqueEntityId'

import { Exercise } from '../../domain/Exercise'
import { ExerciseContent } from '../../domain/ExerciseContent'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { IExerciseRepo } from '../../repos/IExerciseRepo'
import { IUserRepo } from '../../repos/IUserRepo'

import { CreateExerciseUseCase } from './CreateExerciseUseCase'

describe('Create exercise', () => {
  const exercises = [
    {
      id: 'e8db8fe0-e0bf-4fff-87d0-1ed369b6acd0',
      user_id: '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22',
      content: 'Sample Exercise',
      created_at: '2021-06-11T02:17:32-07:00',
    },
    {
      id: '14a1ab60-2a17-4afb-818b-8f7386196414',
      user_id: '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22',
      content: 'Another Exercise',
      created_at: '2021-06-11T02:17:32-07:00',
    },
  ]

  const exercisesRepositorySpy: IExerciseRepo = {
    getAllExercises() {
      return exercises.map((exercise) =>
        Exercise.create(
          {
            userId: new UniqueEntityID(exercise.user_id),
            content: ExerciseContent.create({
              content: exercise.content,
            }).getValue(),
            createdAt: new Date(exercise.created_at),
          },
          new UniqueEntityID(exercise.id)
        ).getValue()
      )
    },
    save(exercise: Exercise) {
      exercises.push({
        id: exercise.id.toString(),
        user_id: exercise.userId.toString(),
        content: exercise.content.value,
        created_at: exercise.createdAt.toISOString(),
      })
    },
  } as unknown as IExerciseRepo

  const usersRepositoryMock: IUserRepo = {
    getUserById() {
      return User.create(
        {
          name: UserName.create({ name: 'Foo Bar' }).getValue(),
          exercises: exercises
            .filter(
              (exercise) =>
                exercise.user_id === '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22'
            )
            .map((exercise) =>
              Exercise.create(
                {
                  userId: new UniqueEntityID(exercise.user_id),
                  content: ExerciseContent.create({
                    content: exercise.content,
                  }).getValue(),
                  createdAt: new Date(exercise.created_at),
                },
                new UniqueEntityID(exercise.id)
              ).getValue()
            ),
        },
        new UniqueEntityID('1fd9b205-6aa3-41e5-8cbd-54bfe3753c22')
      ).getValue()
    },
  } as unknown as IUserRepo

  test(`Given a userId and an exercise's content,
        When the content has the correct length and the user has not reach the exercise limit,
        Then add a new exercise to the repository, and returns success
  `, async () => {
    const createExerciseDTO = {
      userId: 'userId',
      content: 'New Sample Exercise',
    }

    const createExerciseUseCase = new CreateExerciseUseCase(
      usersRepositoryMock,
      exercisesRepositorySpy
    )

    const result = await createExerciseUseCase.execute(createExerciseDTO)

    expect(result.isRight()).toEqual(true)
    expect(exercises.length).toEqual(3)
    expect(exercises[2].content).toEqual('New Sample Exercise')
  })

  test(`Given a userId and an exercise's content,
    When the content is longer than the max allowed length,
    Then returns an error`, async () => {
    const createExerciseDTO = {
      userId: 'userId',
      content: 'a'.repeat(201),
    }

    const createExerciseUseCase = new CreateExerciseUseCase(
      usersRepositoryMock,
      exercisesRepositorySpy
    )

    const result = await createExerciseUseCase.execute(createExerciseDTO)

    expect(result.isLeft()).toEqual(true)
    expect(result.value.getErrorValue()).toEqual(
      'Text is greater than 100 chars.'
    )
  })

  test(`Given a userId and an exercise's content,
    When the user has reached the exercise limit,
    Then returns an error`, async () => {
    const createExerciseDTO = {
      userId: 'userId',
      content: 'New Sample Exercise',
    }

    const userId = '1fd9b205-6aa3-41e5-8cbd-54bfe3753c22'
    const items = new Array(10).fill(null).map(() => ({
      id: new UniqueEntityID(),
      user_id: userId,
      content: `Sample Exercise->${Math.random()}`,
      created_at: new Date(),
    }))

    usersRepositoryMock.getUserById = jest.fn().mockReturnValue(
      User.create(
        {
          name: UserName.create({ name: 'Foo Bar' }).getValue(),
          exercises: items.map((exercise) =>
            Exercise.create(
              {
                userId: new UniqueEntityID(exercise.user_id),
                content: ExerciseContent.create({
                  content: exercise.content,
                }).getValue(),
                createdAt: new Date(exercise.created_at),
              },
              exercise.id
            ).getValue()
          ),
        },
        new UniqueEntityID('1fd9b205-6aa3-41e5-8cbd-54bfe3753c22')
      ).getValue()
    )

    const createExerciseUseCase = new CreateExerciseUseCase(
      usersRepositoryMock,
      exercisesRepositorySpy
    )

    const result = await createExerciseUseCase.execute(createExerciseDTO)

    expect(result.isLeft()).toEqual(true)
    expect(result.value.getErrorValue()).toEqual(
      'User cannot have more than 10 exercises'
    )
  })
})
