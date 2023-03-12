import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './database/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createNewCompany(): Promise<any> {}

  async updateCompanyById(): Promise<any> {}

  async getCompanyByUserId(): Promise<any> {}

  async getAllCompany(): Promise<any> {}

  async deleteCompanyById(): Promise<any> {}
}
