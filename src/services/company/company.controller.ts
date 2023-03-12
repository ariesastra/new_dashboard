import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCompanyByUserId(@Request() request: Request): Promise<any> {}

  @Get('/all')
  async getAllCompany(): Promise<any> {}

  @Put()
  async updateCompanyById(): Promise<any> {}

  @Post()
  async createNewCompany(): Promise<any> {}

  @Delete()
  async deleteCompanyById(): Promise<any> {}
}
