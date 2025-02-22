import type { Express, NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "../errors/unauthorized.error"
import { DecodedIdToken, getAuth } from "firebase-admin/auth"
import { UserServices } from "../services/user.services"
import { ForbiddenError } from "../errors/forbidden.error"

export const authHandler = async (app: Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    // allow login route from authentication
    if (req.method === "POST" && req.url.startsWith("/auth/login")) {
      return next()
    }

    const hasToken = req.headers.authorization

    if (!hasToken || !hasToken.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Token invalid or not provided"))
    }

    const token = hasToken?.split("Bearer ")[1]

    if (!token) {
      return next(new UnauthorizedError("Token invalid or not provided"))
    }

    try {
      const auth = getAuth()

      const decoded: DecodedIdToken = await auth.verifyIdToken(token, true)

      const user = await new UserServices().getById(decoded.uid)

      if (!user) {
        return next(new ForbiddenError())
      }

      req.user = user

      return next()
    } catch (error) {
      console.log(error)
      next(new UnauthorizedError("Token invalid or not provided"))
    }
  })
}
