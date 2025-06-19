// backend/src/utils/errorHandler.ts
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || (err.isAxiosError ? 502 : 500);
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};
