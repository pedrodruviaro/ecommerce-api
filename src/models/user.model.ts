import { Joi } from "celebrate"

export type User = {
  id: string
  name: string
  email: string
  password?: string
}

export const updateUserSchema = Joi.object<User>().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
})

export const newUserSchema = Joi.object<User>().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const authLoginSchema = Joi.object<User>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const authRecoverySchema = Joi.object<User>().keys({
  email: Joi.string().email().required(),
})
