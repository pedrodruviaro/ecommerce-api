import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { celebrate, Segments } from "celebrate"
import asyncHandler from "express-async-handler"
import { userSchema } from "../models/user.model"

const userRoutes = Router()

userRoutes.get("/users", asyncHandler(UserController.getAll))
userRoutes.get("/users/:id", asyncHandler(UserController.getById))
userRoutes.post(
  "/users",
  celebrate({
    [Segments.BODY]: userSchema,
  }),
  asyncHandler(UserController.save)
)
userRoutes.put(
  "/users/:id",
  celebrate({
    [Segments.BODY]: userSchema,
  }),
  asyncHandler(UserController.update)
)
userRoutes.delete("/users/:id", asyncHandler(UserController.destroy))

export default userRoutes
