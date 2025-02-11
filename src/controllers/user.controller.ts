import type { Response, Request } from "express"
import { getFirestore } from "firebase-admin/firestore"

type User = {
  id: number
  name: string
  email: string
}

const users: User[] = []

export class UserController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection("users").get()

    const users = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    res.status(200).json({ users })
  }

  static getById(req: Request, res: Response) {
    const { id } = req.params
    const user = users.find((u) => u.id === parseInt(id))
    res.status(200).json({ user })
  }

  static async save(req: Request, res: Response) {
    const { name, email } = req.body

    const user = await getFirestore().collection("users").add({ name, email })

    res.status(201).json({ id: user.id })
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
