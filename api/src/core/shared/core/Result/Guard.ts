import { Result } from './Result'

export type GuardResponse = string

export interface IGuardArgument {
  argument: any
  argumentName: string
}

export type GuardArgumentCollection = IGuardArgument[]

export const Guard = (() => {
  return {
    combine(guardResults: Result<any>[]): Result<GuardResponse> {
      // eslint-disable-next-line no-restricted-syntax
      for (const result of guardResults) {
        if (result.isFailure) return result
      }

      return Result.ok<GuardResponse>()
    },

    greaterThan(minValue: number, actualValue: number): Result<GuardResponse> {
      return actualValue > minValue
        ? Result.ok<GuardResponse>()
        : Result.fail<GuardResponse>(
            `Number given {${actualValue}} is not greater than {${minValue}}`
          )
    },

    againstAtLeast(numChars: number, text: string): Result<GuardResponse> {
      return text.length >= numChars
        ? Result.ok<GuardResponse>()
        : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`)
    },

    againstAtMost(numChars: number, text: string): Result<GuardResponse> {
      return text.length <= numChars
        ? Result.ok<GuardResponse>()
        : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`)
    },

    againstEmptyArray(argument: any): Result<GuardResponse> {
      if (argument?.length <= 0) {
        return Result.fail<GuardResponse>(`${argument} is empty`)
      }
      return Result.ok<GuardResponse>()
    },

    againstNullOrUndefined(
      argument: any,
      argumentName: string
    ): Result<GuardResponse> {
      if (argument === null || argument === undefined) {
        return Result.fail<GuardResponse>(
          `${argumentName} is null or undefined`
        )
      }
      return Result.ok<GuardResponse>()
    },

    againstNullOrUndefinedBulk(
      args: GuardArgumentCollection
    ): Result<GuardResponse> {
      // eslint-disable-next-line no-restricted-syntax
      for (const arg of args) {
        const result = this.againstNullOrUndefined(
          arg.argument,
          arg.argumentName
        )
        if (result.isFailure) return result
      }

      return Result.ok<GuardResponse>()
    },

    isOneOf(
      value: any,
      validValues: any[],
      argumentName: string
    ): Result<GuardResponse> {
      let isValid = false
      // eslint-disable-next-line no-restricted-syntax
      for (const validValue of validValues) {
        if (value === validValue) {
          isValid = true
        }
      }

      if (isValid) {
        return Result.ok<GuardResponse>()
      }
      return Result.fail<GuardResponse>(
        `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues
        )}. Got "${value}".`
      )
    },

    inRange(
      num: number,
      min: number,
      max: number,
      argumentName: string
    ): Result<GuardResponse> {
      const isInRange = num >= min && num <= max
      if (!isInRange) {
        return Result.fail<GuardResponse>(
          `${argumentName} is not within range ${min} to ${max}.`
        )
      }
      return Result.ok<GuardResponse>()
    },

    allInRange(
      numbers: number[],
      min: number,
      max: number,
      argumentName: string
    ): Result<GuardResponse> {
      let failingResult: Result<GuardResponse> = null

      // eslint-disable-next-line no-restricted-syntax
      for (const num of numbers) {
        const numIsInRangeResult = this.inRange(num, min, max, argumentName)
        if (!numIsInRangeResult.isFailure) failingResult = numIsInRangeResult
      }

      if (failingResult) {
        return Result.fail<GuardResponse>(
          `${argumentName} is not within the range.`
        )
      }
      return Result.ok<GuardResponse>()
    },
  }
})()
