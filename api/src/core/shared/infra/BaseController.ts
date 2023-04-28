export abstract class BaseController {
  protected abstract executeImpl(req: any): Promise<void | any>

  public async execute(req: any): Promise<void> {
    try {
      await this.executeImpl(req)
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      this.fail('An unexpected error occurred')
    }
  }

  public ok<T>(dto?: T) {
    if (dto) {
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
    throw new Error(message || 'Unauthorized')
  }

  public unauthorized(message?: string) {
    throw new Error(message || 'Unauthorized')
  }

  public paymentRequired(message?: string) {
    throw new Error(message || 'Payment required')
  }

  public forbidden(message?: string) {
    throw new Error(message || 'Forbidden')
  }

  public notFound(message?: string) {
    throw new Error(message || 'Not found')
  }

  public conflict(message?: string) {
    throw new Error(message || 'Conflict')
  }

  public tooMany(message?: string) {
    throw new Error(message || 'Too many requests')
  }

  public todo(message: any) {
    throw new Error(message || 'TODO')
  }

  public fail(message: any) {
    throw new Error(message || 'Something went wrong')
  }
}
