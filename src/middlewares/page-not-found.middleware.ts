import { NotFoundError } from "../errors/not-found.error"
import type { Express, Request, Response, NextFunction } from "express"

export const pageNotFoundHandler = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError("Page not found"))
  })
}
