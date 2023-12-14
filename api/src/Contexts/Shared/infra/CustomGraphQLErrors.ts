/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable max-classes-per-file */
// import apiserver from '@redwoodjs/api-server';

export class NotFoundError extends Error {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message);
  }
}

export class ConflictError extends Error {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message);
  }
}

export class TooManyRequestsError extends Error {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message);
  }
}

export class TodoError extends Error {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message);
  }
}

export class UnexpectedError extends Error {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message);
  }
}
