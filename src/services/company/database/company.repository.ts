import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entity/company.entity';

export class CompanyRepository extends Repository<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {
    super(
      companyRepository.target,
      companyRepository.manager,
      companyRepository.queryRunner,
    );
  }
}
