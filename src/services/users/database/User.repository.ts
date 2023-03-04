import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/User.entity';

export class UserRepository extends Repository<Users> {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findUserByEmail(email: string): Promise<Users> {
    return await this.findOneBy({ email: email });
  }
}
