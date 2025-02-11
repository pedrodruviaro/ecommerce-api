import type { Response, Request } from "express"
import { getFirestore } from "firebase-admin/firestore"

// type User = {
//   id: string
//   name: string
//   email: string
// }

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

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const doc = await getFirestore().collection("users").doc(id).get()

    res.status(200).json({
      id: doc.id,
      ...doc.data(),
    })
  }

  static async save(req: Request, res: Response) {
    const { name, email } = req.body

    const user = await getFirestore().collection("users").add({ name, email })

    res.status(201).json({ id: user.id })
  }

  static async update(req: Request, res: Response) {
    const { name, email } = req.body
    const { id } = req.params

    await getFirestore().collection("users").doc(id).set({
      name,
      email,
    })

    res.status(201).json({})
  }

  static async destroy(req: Request, res: Response) {
    const { id } = req.params

    await getFirestore().collection("users").doc(id).delete()

    res.status(204).json()
  }
}
