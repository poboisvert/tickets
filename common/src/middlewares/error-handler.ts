import { Request, Response, NextFunction } from "express";
// Middleware error handler
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Uniform return errors
  // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes - 500 internal error or 503
  if (err instanceof CustomError) {
    // 400 user sent bad data
    // console.log(err)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  res.status(400).send({
    message: "Something went wrong",
  });
};
