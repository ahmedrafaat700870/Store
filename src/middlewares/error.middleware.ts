import { Error } from '../interfaces/Error.interface';
import { Request, Response, NextFunction } from 'express';
export const HeddleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 404;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ message: message });
};
