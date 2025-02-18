import { BaseError } from "./base.error"

export class EmailAlreadyExistsError extends BaseError {
  constructor(message = "Email already in use") {
    super(409, message)
  }
}
