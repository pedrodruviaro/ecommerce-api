import { Router } from "express"
import { UserController } from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.get("/users", UserController.getAll)
userRoutes.get("/users/:id", UserController.getById)
userRoutes.post("/users", UserController.save)
userRoutes.put("/users/:id", UserController.update)
userRoutes.delete("/users/:id", UserController.destroy)

export default userRoutes
