import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ValidationError,
  SyntaxError,
} from '@redwoodjs/graphql-server'

export abstract class BaseController {
  protected abstract execute(req?: any): Promise<void | any>

  public ok<T>(dto?: T) {
    if (dto) {
      console.log('dto', dto)
      return dto
    }
    return {
      status: 'succeed',
    }
  }

  public created() {
    return {
      status: 'succeed',
    }
  }

  public clientError(message?: string) {
    throw new UserInputError(message || 'Unauthorized')
  }

  public unauthorized(message?: string) {
    throw new AuthenticationError(message || 'Unauthorized')
  }

  public paymentRequired(message?: string) {
    throw new ForbiddenError(message || 'Payment required')
  }

  public forbidden(message?: string) {
    throw new ForbiddenError(message || 'Forbidden')
  }

  public notFound(message?: string) {
    throw new ValidationError(message || 'Not found')
  }

  public conflict(message?: string) {
    throw new ValidationError(message || 'Conflict')
  }

  public tooMany(message?: string) {
    throw new ValidationError(message || 'Too many requests')
  }

  public todo(message: any) {
    throw new SyntaxError(message || 'TODO')
  }

  public fail(message: any) {
    throw new SyntaxError(message || 'Something went wrong')
  }
}
