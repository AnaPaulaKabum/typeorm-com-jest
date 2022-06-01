import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.query(`select * from user`);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
