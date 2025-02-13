import { getFirestore } from "firebase-admin/firestore"
import { User } from "../models/user.model"
import { NotFoundError } from "../errors/not-found.error"

export class UserServices {
  async getAll(): Promise<User[]> {
    const snapshot = await getFirestore().collection("users").get()

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    }) as User[]
  }

  async getById(id: string): Promise<User> {
    const doc = await getFirestore().collection("users").doc(id).get()

    if (!doc.exists) throw new NotFoundError("User not found")

    return {
      id: doc.id,
      ...doc.data(),
    } as User
  }

  async save(user: User): Promise<void> {
    await getFirestore().collection("users").add(user)
  }

  async update(id: string, user: User): Promise<void> {
    const docRef = getFirestore().collection("users").doc(id)

    if (!(await docRef.get()).exists) throw new NotFoundError("User not found")

    await docRef.set(user)
  }

  async destroy(id: string): Promise<void> {
    await getFirestore().collection("users").doc(id).delete()
  }
}
