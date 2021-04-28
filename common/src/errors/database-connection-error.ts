import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  // Error code return
  statusCode = 500;
  // this.reason data
  reason = "DB connection module";

  constructor() {
    super("DB in super");

    // Extend a class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
