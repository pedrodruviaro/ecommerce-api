import { FirebaseError } from "firebase/app"
import { EmailAlreadyExistsError } from "../errors/email-already-exsists.error"
import { UnauthorizedError } from "../errors/unauthorized.error"
import { User } from "../models/user.model"
import {
  FirebaseAuthError,
  getAuth,
  UpdateRequest,
  UserRecord,
} from "firebase-admin/auth"
import {
  signInWithEmailAndPassword,
  getAuth as getFirebaseAuth,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth"

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

  async update(id: string, user: User) {
    const props: UpdateRequest = {
      displayName: user.name,
      email: user.email,
    }

    if (user.password) {
      props.password = user.password
    }

    await getAuth().updateUser(id, props)
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const auth = getFirebaseAuth()

    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          throw new UnauthorizedError("Email or password incorrect")
        }
      }

      throw err
    })
  }

  async destroy(id: string) {
    await getAuth().deleteUser(id)
  }

  async recovery(email: string) {
    // change email model in firebase console > Authentication > Models > Password Reset
    await sendPasswordResetEmail(getFirebaseAuth(), email)
  }
}
