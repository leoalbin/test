import { PrismaExercisesRepo } from 'src/core/subdomains/exercises/repos/implementations/PrismaExercisesRepo'
import { PrismaUsersRepo } from 'src/core/subdomains/exercises/repos/implementations/PrismaUsersRepo'
import { CreateExerciseController } from 'src/core/subdomains/exercises/useCases/CreateExercise/CreateExerciseController'
import { CreateExerciseUseCase } from 'src/core/subdomains/exercises/useCases/CreateExercise/CreateExerciseUseCase'
import { GetAllExercisesController } from 'src/core/subdomains/exercises/useCases/GetAllExercises/GetAllExercisesController'
import { GetAllExercisesUseCase } from 'src/core/subdomains/exercises/useCases/GetAllExercises/GetAllExercisesUseCase'

export const getAllExercises = async ({ userId }: { userId: string }) => {
  const userRepo = new PrismaUsersRepo()
  const exerciseRepo = new PrismaExercisesRepo()
  const useCase = new GetAllExercisesUseCase(userRepo, exerciseRepo)
  const controller = new GetAllExercisesController(useCase)
  const response = await controller.execute({ userId })
  return response
}

export const createExercise = async ({
  userId,
  content,
}: {
  userId: string
  content: string
}) => {
  const userRepo = new PrismaUsersRepo()
  const exerciseRepo = new PrismaExercisesRepo()
  const useCase = new CreateExerciseUseCase(userRepo, exerciseRepo)
  const controller = new CreateExerciseController(useCase)
  const response = await controller.execute({ userId, content })
  return response
}
