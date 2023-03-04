import { DataSource } from 'typeorm';
import { Users } from './entity/User.entity';

export const photoProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
];
