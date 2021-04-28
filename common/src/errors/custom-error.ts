export abstract class CustomError extends Error {
  abstract statusCode: number;

  // Require to extends a class
  constructor(message: string) {
    // Require
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // To extend need a serialize
  abstract serializeErrors(): { message: string; field?: string }[];
}
