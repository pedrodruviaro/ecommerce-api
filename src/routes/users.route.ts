import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { celebrate, Segments } from "celebrate"
import asyncHandler from "express-async-handler"
import { newUserSchema, updateUserSchema } from "../models/user.model"

const userRoutes = Router()

userRoutes.get("/users", asyncHandler(UserController.getAll))
userRoutes.get("/users/:id", asyncHandler(UserController.getById))
userRoutes.post(
  "/users",
  celebrate({
    [Segments.BODY]: newUserSchema,
  }),
  asyncHandler(UserController.save)
)
userRoutes.put(
  "/users/:id",
  celebrate({
    [Segments.BODY]: updateUserSchema,
  }),
  asyncHandler(UserController.update)
)
userRoutes.delete("/users/:id", asyncHandler(UserController.destroy))

export default userRoutes
