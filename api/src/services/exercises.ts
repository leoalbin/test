import { PrismaExercisesRepo } from 'src/core/subdomains/exercises/repos/implementations/PrismaExercisesRepo'
import { CreateExerciseController } from 'src/core/subdomains/exercises/useCases/CreateExercise/CreateExerciseController'
import { CreateExerciseUseCase } from 'src/core/subdomains/exercises/useCases/CreateExercise/CreateExerciseUseCase'
import { GetAllExercisesController } from 'src/core/subdomains/exercises/useCases/GetAllExercises/GetAllExercisesController'
import { GetAllExercisesUseCase } from 'src/core/subdomains/exercises/useCases/GetAllExercises/GetAllExercisesUseCase'
import { PrismaUsersRepo } from 'src/core/subdomains/users/repos/implementations/PrismaUsersRepo'

export const getAllExercises = async () => {
  const userRepo = new PrismaUsersRepo()
  const exerciseRepo = new PrismaExercisesRepo()
  const useCase = new GetAllExercisesUseCase(userRepo, exerciseRepo)
  const controller = new GetAllExercisesController(useCase)
  const response = await controller.execute()
  return response
}

export const createExercise = async ({ input }) => {
  const userRepo = new PrismaUsersRepo()
  const exerciseRepo = new PrismaExercisesRepo()
  const useCase = new CreateExerciseUseCase(userRepo, exerciseRepo)
  const controller = new CreateExerciseController(useCase)
  const response = await controller.execute({
    userId: input.userId,
    content: input.content,
  })

  console.log(response)
  return response
}
