import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { AppError } from '@/helpers/app-error.helper';

export function handleAsyncErrorMiddleware(
  error: Error | any,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  if (error.code === '23505') {
    return response.status(409).json({
      status: 'error',
      message: `Database Query Execution error: ${error.detail}`,
    });
  }
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'AppError',
      message: error.message,
      details: error.details,
    });
  }
  return response.status(error.statusCode || 500).json({
    status: 'error',
    message: `Internal Server Error\n\n${error.message}`,
    ...error,
  });
}
