import userRoutes from "./users.route"
import express from "express"
import type { Express } from "express"

export const routes = (app: Express) => {
  app.use(express.json())
  app.use(userRoutes)
}
