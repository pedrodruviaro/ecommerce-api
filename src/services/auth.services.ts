import { EmailAlreadyExistsError } from "../errors/email-already-exsists.error"
import { User } from "../models/user.model"
import { FirebaseAuthError, getAuth, UserRecord } from "firebase-admin/auth"

export class AuthServices {
  // https://firebase.google.com/docs/auth/admin/manage-users?hl=pt-br

  async create(user: User): Promise<UserRecord> {
    return getAuth()
      .createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      })
      .catch((err) => {
        if (
          err instanceof FirebaseAuthError &&
          err.code === "auth/email-already-exists"
        ) {
          throw new EmailAlreadyExistsError()
        }

        throw err
      })
  }
}
