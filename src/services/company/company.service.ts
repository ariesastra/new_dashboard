import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './database/company.repository';
import { CompanyEntity } from './database/entity/company.entity';
import { CreateCompanyRequest } from './dto/company.dto';
import { GlobalResponse } from 'src/helper/types/common.type';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createNewCompany(
    request: CreateCompanyRequest,
  ): Promise<GlobalResponse> {
    try {
      const newCompany: CompanyEntity = new CompanyEntity();
      newCompany.id = crypto.randomUUID();
      newCompany.companyName = request.companyName;
      newCompany.companyImg = request.companyImg;
      console.log(newCompany);
      await this.companyRepository.save(newCompany).catch((error) => {
        throw error;
      });

      return {
        statusCode: 201,
        message: `new company created for ${request.companyName}`,
      };
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when create new company`,
        error,
      );
      return error.response;
    }
  }

  async updateCompanyById(): Promise<any> {}

  async getCompanyByUserId(): Promise<any> {}

  async getAllCompany(): Promise<any> {}

  async deleteCompanyById(): Promise<any> {}
}
