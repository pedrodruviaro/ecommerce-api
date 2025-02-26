import { Joi } from "celebrate"

export type Company = {
  id?: string
  logomarca: string
  cpfCnpj: string
  razaoSocial: string
  nomeFantasia: string
  telefone: string
  horarioFuncionamento: string
  endereco: string
  localizacao: string
  taxaEntrega: number
  ativa?: boolean
}

const PHONE_REGEX =
  /(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/

export const createCompanySchema = Joi.object<Company>().keys({
  logomarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(), // cpf
    Joi.string().length(14).required() // cnpj
  ),
  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  telefone: Joi.string().regex(PHONE_REGEX).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),
  ativa: Joi.boolean().only().allow(true).default(true),
})

export const updateCompanySchema = Joi.object<Company>().keys({
  logomarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(), // cpf
    Joi.string().length(14).required() // cnpj
  ),
  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  telefone: Joi.string().regex(PHONE_REGEX).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),
  ativa: Joi.boolean().required(),
})
