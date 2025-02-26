import { NotFoundError } from "../errors/not-found.error"
import { Company } from "../models/company.model"
import { CompanyRepository } from "../repositories/company.repository"

export class CompanyService {
  private companyRepository: CompanyRepository

  constructor() {
    this.companyRepository = new CompanyRepository()
  }

  async getAll(): Promise<Company[]> {
    return await this.companyRepository.getAll()
  }

  async getById(id: string): Promise<Company> {
    const company = await this.companyRepository.getById(id)

    if (!company) throw new NotFoundError("Company not found")

    return company
  }

  async save(company: Company): Promise<void> {
    await this.companyRepository.save(company)
  }

  async update(id: string, company: Company): Promise<void> {
    const existentCompany = await this.companyRepository.getById(id)

    if (!existentCompany) throw new NotFoundError("Company not found")

    existentCompany.logomarca = company.logomarca
    existentCompany.cpfCnpj = company.cpfCnpj
    existentCompany.razaoSocial = company.razaoSocial
    existentCompany.nomeFantasia = company.nomeFantasia
    existentCompany.telefone = company.telefone
    existentCompany.horarioFuncionamento = company.horarioFuncionamento
    existentCompany.endereco = company.endereco
    existentCompany.localizacao = company.localizacao
    existentCompany.taxaEntrega = company.taxaEntrega
    existentCompany.ativa = company.ativa

    await this.companyRepository.update(existentCompany)
  }
}
