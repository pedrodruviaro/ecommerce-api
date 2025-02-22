import { User } from "../models/user.model"
import { UserRepository } from "../repositories/user.repository"
import { NotFoundError } from "../errors/not-found.error"
import { AuthServices } from "./auth.services"
import { FirebaseAuthError } from "firebase-admin/auth"

export class UserServices {
  private userRepository: UserRepository
  private authServices: AuthServices

  constructor() {
    this.userRepository = new UserRepository()
    this.authServices = new AuthServices()
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll()
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id)

    if (!user) throw new NotFoundError("User not found")

    return user
  }

  async save(user: User): Promise<void> {
    const userAuth = await this.authServices.create(user)
    user.id = userAuth.uid
    await this.userRepository.update(user)
  }

  async update(id: string, user: User): Promise<void> {
    const existentUser = await this.userRepository.getById(id)

    if (!existentUser) throw new NotFoundError("User not found")

    existentUser.name = user.name
    existentUser.email = user.email

    await this.authServices.update(id, user)

    // no password is stored
    await this.userRepository.update(existentUser)
  }

  async destroy(id: string): Promise<void> {
    try {
      await this.authServices.destroy(id)
      await this.userRepository.destroy(id)
      return
    } catch (error) {
      if (
        error instanceof FirebaseAuthError &&
        error.code === "auth/user-not-found"
      ) {
        throw new NotFoundError("User not found")
      }
      throw error
    }
  }
}
