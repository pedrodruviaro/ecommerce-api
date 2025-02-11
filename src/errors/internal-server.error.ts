import { BaseError } from "./base.error"

export class InternalServerError extends BaseError {
  constructor(message = "Internal server error") {
    super(500, message)
  }
}
