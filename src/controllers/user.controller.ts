import type { Response, Request } from "express"

type User = {
  id: number
  name: string
  email: string
}

let id = 0
const users: User[] = []

export class UserController {
  static getAll(req: Request, res: Response) {
    res.status(200).json({ users })
  }

  static getById(req: Request, res: Response) {
    const { id } = req.params
    const user = users.find((u) => u.id === parseInt(id))
    res.status(200).json({ user })
  }

  static save(req: Request, res: Response) {
    const { name, email } = req.body

    const user = { id: ++id, name, email }
    users.push(user)

    res.status(201).json({ user })
  }

  static update(req: Request, res: Response) {
    const { name, email } = req.body
    const { id } = req.params

    const userIdx = users.findIndex((u) => u.id === parseInt(id))

    users[userIdx].name = name
    users[userIdx].email = email

    res.status(201).json({ user: users[userIdx] })
  }

  static destroy(req: Request, res: Response) {
    const { id } = req.params
    const userIdx = users.findIndex((u) => u.id === parseInt(id))
    users.splice(userIdx, 1)

    res.status(204).json()
  }
}
