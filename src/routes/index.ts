import userRoutes from "./users.route"
import express from "express"
import authRoutes from "./auth.route"
import companyRoutes from "./companies.route"
import type { Express } from "express"

export const routes = (app: Express) => {
  app.use(express.json())
  app.use(authRoutes)
  app.use(userRoutes)
  app.use(companyRoutes)
}
