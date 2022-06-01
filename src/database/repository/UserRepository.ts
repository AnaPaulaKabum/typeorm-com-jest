import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async save(user: User): Promise<User> {
    console.log('salvando..');
    return this.userRepository.save(user);
  }
}
