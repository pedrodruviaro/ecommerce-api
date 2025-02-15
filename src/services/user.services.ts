import { User } from "../models/user.model"
import { UserRepository } from "../repositories/user.repository"
import { NotFoundError } from "../errors/not-found.error"

export class UserServices {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
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
    await this.userRepository.save(user)
  }

  async update(id: string, user: User): Promise<void> {
    const existentUser = await this.userRepository.getById(id)

    if (!existentUser) throw new NotFoundError("User not found")

    existentUser.name = user.name
    existentUser.email = user.email

    await this.userRepository.update(existentUser)
  }

  async destroy(id: string): Promise<void> {
    await this.userRepository.destroy(id)
  }
}
