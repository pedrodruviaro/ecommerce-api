import { errors as celebrateErrors } from "celebrate"
import { InternalServerError } from "../errors/internal-server.error"
import { BaseError } from "../errors/base.error"
import type { Express, NextFunction, Request, Response } from "express"

export const errorHandler = (app: Express) => {
  app.use(celebrateErrors())

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
      err.send(res)
    } else {
      new InternalServerError().send(res)
    }
  })
}
