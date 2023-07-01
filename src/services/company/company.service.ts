import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from './database/company.repository';
import { CompanyEntity } from './database/entity/company.entity';
import { CreateCompanyRequest } from './dto/company.dto';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { CompanyAdapter } from './adapter/company.adapter';
import { UserEntity } from '../users/database/entity/User.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class CompanyService {
  response = new GlobalResponse();
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyAdapter: CompanyAdapter,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

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
      return this.response.error(error);
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
      return this.response.error(error);
    }
  }

  async getCompanyByUserId(userId: string): Promise<GlobalResponse> {
    try {
      const companyIdFromUser: UserEntity =
        await this.userService.getCompanyIdByUserId(userId);
      const companyEntity: CompanyEntity =
        await this.companyRepository.findOneBy({
          id: companyIdFromUser.companyId,
        });
      if (!companyEntity) throw new NotFoundException('company not found');

      return this.response.successResponse(
        200,
        'success',
        this.companyAdapter.EntityToResult(companyEntity),
      );
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyByUserId] error when get company by userId for ${userId}`,
        error,
      );
      return this.response.error(error);
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

      return this.response.successResponse(
        200,
        'success',
        this.companyAdapter.EntityToResult(company),
      );
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyById] error when get company by id for ${companyId}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async getAllCompany(): Promise<GlobalResponse> {
    try {
      const allCompany: CompanyEntity[] = await this.companyRepository.find();
      const companyResult: CompanyEntity[] = [];
      for (const company of allCompany) {
        const adapter = this.companyAdapter.EntityToResult(company);
        companyResult.push(adapter);
      }

      return this.response.successResponse(200, 'success', companyResult);
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyById] error when get all company`,
        error,
      );
      return this.response.error(error);
    }
  }

  async deleteCompanyById(companyId: string): Promise<any> {
    try {
      const companyById: CompanyEntity = await this.companyRepository.findOneBy(
        {
          id: companyId,
        },
      );
      if (!companyById) {
        throw new NotFoundException('company not found!');
      }

      const deleteById: any = await this.companyRepository.delete({
        id: companyId,
      });
      if (deleteById.affected === 0) {
        throw new InternalServerErrorException(
          `'something wrong when deletion process for company id ${companyId}`,
        );
      }

      return this.response.successResponse(
        200,
        `company ${companyById.companyName} deleted successfully`,
      );
    } catch (error) {
      console.error(
        `[CompanyService][getCompanyById] error when get company by id for ${companyId}`,
        error,
      );
      return this.response.error(error);
    }
  }
}
