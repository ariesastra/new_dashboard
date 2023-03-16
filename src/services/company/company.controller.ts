import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
  Body,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { JwtPayload } from '../auth/types/token.type';
import { UserService } from '../users/users.service';
import { CompanyService } from './company.service';
import { AssignCompanyRequest, CreateCompanyRequest } from './dto/company.dto';

@Controller('v1/company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getCompanyByUserId(
    @Request() request: JwtPayload,
  ): Promise<GlobalResponse> {
    const userId: string = request.user.userId;
    try {
      console.log(
        `[CompanyController][getCompanyByUserId] get company by user id for ${userId}`,
      );
      return this.companyService.getCompanyByUserId(userId);
    } catch (error) {
      console.error(
        `[CompanyController][getCompanyByUserId] error when get company by user id for ${userId}`,
        error,
      );
    }
  }

  @Get('/all')
  async getAllCompany(): Promise<any> {}

  @Post('/create')
  async createNewCompany(@Body() request: CreateCompanyRequest): Promise<any> {
    try {
      console.log(
        `[CompanyController][createNewCompany] create new company ${request}`,
      );
      return this.companyService.createNewCompany(request);
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when create new company`,
        error,
      );
    }
  }

  @Post('/add-to-user')
  async assignCompanyToUser(
    @Body() request: AssignCompanyRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[CompanyController][assignCompanyToUser] assign company id ${request.companyId} to user id ${request.userId}`,
      );
      return this.userService.assignCompanyToUser(request);
    } catch (error) {
      console.error(
        `[CompanyController][assignCompanyToUser] error when assign company to user`,
        error,
      );
    }
  }

  @Put()
  async updateCompanyById(
    @Query('company-id') companyId: string,
    @Body() request: CreateCompanyRequest,
  ): Promise<any> {
    try {
      console.log(
        `[CompanyController][createNewCompany] update company for ${companyId}`,
      );
      return this.companyService.updateCompanyById(companyId, request);
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when update company for ${request.companyName}`,
        error,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteCompanyById(
    @Query('company-id') companyId: string,
  ): Promise<any> {
    try {
      console.log(
        `[CompanyController][createNewCompany] update company for ${companyId}`,
      );
      return await this.companyService.deleteCompanyById(companyId);
    } catch (error) {
      console.error(
        `[CompanyController][createNewCompany] error when delete company id ${companyId}`,
        error,
      );
    }
  }
}
