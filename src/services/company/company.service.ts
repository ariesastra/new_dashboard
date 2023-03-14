import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './database/company.repository';
import { CompanyEntity } from './database/entity/company.entity';
import { CreateCompanyRequest } from './dto/company.dto';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { GlobalResponse } from 'src/helper/common/globalResponse';

@Injectable()
export class CompanyService {
  response = new GlobalResponse();
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createNewCompany(
    request: CreateCompanyRequest,
  ): Promise<GlobalResponseType> {
    try {
      const newCompany: CompanyEntity = new CompanyEntity();
      newCompany.id = crypto.randomUUID();
      newCompany.companyName = request.companyName;
      newCompany.companyImg = request.companyImg;
      await this.companyRepository.save(newCompany).catch((error) => {
        throw error;
      });

      return this.response.successResponse(
        201,
        `new company created for ${request.companyName}`,
        newCompany,
      );
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when create new company`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async updateCompanyById(
    id: string,
    companyRequest: CreateCompanyRequest,
  ): Promise<any> {
    try {
      // get company by id
      const companyById: CompanyEntity = await this.companyRepository.findOneBy(
        { id: id },
      );
      // if no company, return 404
      if (!companyById) {
        throw new NotFoundException('company not found!');
      }
      // update company by id
      const updateCompanyById: any = await this.companyRepository.update(
        { id: id },
        {
          companyName: companyRequest.companyName,
          companyImg: companyRequest.companyImg,
        },
      );
      // return 200
      console.log(updateCompanyById);
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when create new company`,
        error,
      );
      return error.response ? error.response : error.detail;
    }
  }

  async getCompanyByUserId(): Promise<any> {}

  async getAllCompany(): Promise<any> {}

  async deleteCompanyById(): Promise<any> {}
}
