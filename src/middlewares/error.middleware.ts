import { Request, Response, NextFunction } from 'express';
import {env} from '../config'

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error('[Error Middleware]:', {
    status,
    message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  res.status(status).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorMiddleware;
