import userRoutes from "./users.route"
import express from "express"
import type { Express } from "express"
import authRoutes from "./auth.route"

export const routes = (app: Express) => {
  app.use(express.json())
  app.use(authRoutes)
  app.use(userRoutes)
}
