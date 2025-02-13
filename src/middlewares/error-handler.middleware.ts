import { errors as celebrateErrors } from "celebrate"
import { ValidationError } from "../errors/validation.error"
import { InternalServerError } from "../errors/internal-server.error"
import { NotFoundError } from "../errors/not-found.error"
import type { Express, NextFunction, Request, Response } from "express"

export const errorHandler = (app: Express) => {
  app.use(celebrateErrors())

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
