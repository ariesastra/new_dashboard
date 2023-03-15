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
        `[CompanyService][createNewCompany] error when create new company`,
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
      const companyById: CompanyEntity = await this.companyRepository.findOneBy(
        { id: id },
      );
      if (!companyById) {
        throw new NotFoundException('company not found!');
      }

      const updateCompanyById: any = await this.companyRepository.update(
        { id: id },
        {
          companyName: companyRequest.companyName,
          companyImg: companyRequest.companyImg,
        },
      );

      return this.response.successResponse(
        200,
        'success update',
        updateCompanyById,
      );
    } catch (error) {
      console.error(
        `[CompanyService][createNewCompany] error when create new company`,
        error,
      );
      return error.response ? error.response : error.detail;
    }
  }

  async getCompanyByUserId(userId: string): Promise<GlobalResponse> {
    try {
      // get company from repository
      // if not found, throw not found
      // then return
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyByUserId] error when get company by userId for ${userId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async getCompanyById(companyId: string): Promise<GlobalResponse> {
    try {
      const company: CompanyEntity = await this.companyRepository.findOneBy({
        id: companyId,
      });
      if (!company) {
        throw new NotFoundException('company id not found!');
      }

      return this.response.successResponse(200, 'success', company);
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyById] error when get company by id for ${companyId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async getAllCompany(): Promise<any> {}

  async deleteCompanyById(): Promise<any> {}
}
