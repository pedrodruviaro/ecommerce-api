import { Request, Response } from "express"
import { AuthServices } from "../services/auth.services"

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    const userRecord = await new AuthServices().login(email, password)
    const token = await userRecord.user.getIdToken(true)

    res.send({ token })
  }
}
