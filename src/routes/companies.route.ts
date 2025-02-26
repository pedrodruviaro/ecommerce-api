import asyncHandler from "express-async-handler"
import { Router } from "express"
import { celebrate, Segments } from "celebrate"
import { CompaniesController } from "../controllers/companies.controller"
import {
  createCompanySchema,
  updateCompanySchema,
} from "../models/company.model"

const companyRoutes = Router()

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll))
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById))
companyRoutes.post(
  "/companies",
  celebrate({
    [Segments.BODY]: createCompanySchema,
  }),
  asyncHandler(CompaniesController.save)
)
companyRoutes.put(
  "/companies/:id",
  celebrate({
    [Segments.BODY]: updateCompanySchema,
  }),
  asyncHandler(CompaniesController.update)
)

export default companyRoutes
