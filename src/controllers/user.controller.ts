import { User } from "../models/user.model"
import { UserServices } from "../services/user.services"
import type { Response, Request } from "express"

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await new UserServices().getAll()

    res.status(200).send(users)
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params

    const user = await new UserServices().getById(id)

    res.status(200).send(user)
  }

  static async save(req: Request, res: Response) {
    const user = req.body as User

    await new UserServices().save(user)

    res.status(201).send({ message: "User created" })
  }

  static async update(req: Request, res: Response) {
    const user = req.body as User
    const { id } = req.params

    await new UserServices().update(id, user)

    res.status(201).send({ message: "User updated" })
  }

  static async destroy(req: Request, res: Response) {
    const { id } = req.params

    await new UserServices().destroy(id)

    res.status(200).send({ message: "User deleted" })
  }
}
