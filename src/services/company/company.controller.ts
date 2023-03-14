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
import { CompanyService } from './company.service';
import { CreateCompanyRequest } from './dto/company.dto';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCompanyByUserId(@Request() request: Request): Promise<any> {}

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

  @Put()
  async updateCompanyById(
    @Query('companyId') companyId: string,
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

  @Delete()
  async deleteCompanyById(): Promise<any> {}
}
