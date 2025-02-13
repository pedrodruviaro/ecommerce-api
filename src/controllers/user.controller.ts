import type { Response, Request, NextFunction } from "express"
import { getFirestore } from "firebase-admin/firestore"
import { NotFoundError } from "../errors/not-found.error"
import { User } from "../models/user.model"

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const snapshot = await getFirestore().collection("users").get()

      const users = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      res.status(200).json({ users })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const doc = await getFirestore().collection("users").doc(id).get()

    if (!doc.exists) throw new NotFoundError("User not found")

    res.status(200).json({
      id: doc.id,
      ...doc.data(),
    })
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body as User

      const user = await getFirestore().collection("users").add({ name, email })

      res.status(201).json({ id: user.id })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body as User
    const { id } = req.params

    const docRef = getFirestore().collection("users").doc(id)

    if ((await docRef.get()).exists) {
      await docRef.set({
        name,
        email,
      })

      res.status(201).send({
        message: "User updated",
      })
    } else {
      throw new NotFoundError("User not found")
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      await getFirestore().collection("users").doc(id).delete()

      res.status(204)
    } catch (error) {
      next(error)
    }
  }
}
