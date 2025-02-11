import type { Express, NextFunction, Request, Response } from "express"
import { ValidationError } from "../errors/validation.error"
import { InternalServerError } from "../errors/internal-server.error"
import { NotFoundError } from "../errors/not-found.error"

export const errorHandler = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
      err.send(res)
    } else if (err instanceof NotFoundError) {
      err.send(res)
    } else {
      new InternalServerError().send(res)
    }
  })
}
