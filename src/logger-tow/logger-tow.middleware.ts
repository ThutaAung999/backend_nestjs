import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Functionl logger`);
  console.log('LoggerTwoMiddleware : req.url: ', req.url);
  next();
}
