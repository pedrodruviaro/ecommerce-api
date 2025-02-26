import { CompanyService } from "../services/company.services"
import type { Response, Request } from "express"

export class CompaniesController {
  static async getAll(req: Request, res: Response) {
    const companies = await new CompanyService().getAll()

    res.status(200).send(companies)
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params

    const company = await new CompanyService().getById(id)

    res.status(200).send(company)
  }

  static async save(req: Request, res: Response) {
    await new CompanyService().save(req.body)

    res.status(201).send({ message: "Company created" })
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params

    await new CompanyService().update(id, req.body)

    res.status(201).send({ message: "Company updated" })
  }
}
