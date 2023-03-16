import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../database/entity/company.entity';

@Injectable()
export class CompanyAdapter {
  public EntityToResult(company: CompanyEntity) {
    const companyResult: CompanyEntity = new CompanyEntity();
    companyResult.id = company.id;
    companyResult.companyName = company.companyName;
    companyResult.companyImg = company.companyImg;

    return companyResult;
  }
}
