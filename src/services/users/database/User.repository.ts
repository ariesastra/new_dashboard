import { Repository, DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entity/User.entity';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private datasource: DataSource) {
    super(Users, datasource.createEntityManager());
  }

  async getUserById(id: string): Promise<Users> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }
}
