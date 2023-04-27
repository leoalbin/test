/* eslint-disable @typescript-eslint/no-throw-literal */
// import { ForbiddenError, UserInputError } from '@redwoodjs/api-server';
// import { ConflictError, NotFoundError, TodoError, TooManyRequestsError, UnexpectedError } from './CustomGraphQLErrors';

export const UseCaseController = () => {
  return {
    ok<T>(dto?: T) {
      if (dto) {
        return dto;
      }
      return {
        status: 'succeed',
      };
    },

    created() {
      return {
        status: 'succeed',
      };
    },

    clientError(message?: string) {
      throw new Error(message || 'Unauthorized');
    },

    unauthorized(message?: string) {
      throw new Error(message || 'Unauthorized');
    },

    paymentRequired(message?: string) {
      throw new Error(message || 'Payment required');
    },

    forbidden(message?: string) {
      throw new Error(message || 'Forbidden');
    },

    notFound(message?: string) {
      throw new Error(message || 'Not found');
    },

    conflict(message?: string) {
      throw new Error(message || 'Conflict');
    },

    tooMany(message?: string) {
      throw new Error(message || 'Too many requests');
    },

    todo(message: any) {
      throw new Error(message || 'TODO');
    },

    fail(message: any) {
      throw new Error(message || 'Something went wrong');
    },
  };
};
