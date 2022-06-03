import { User } from '../entities/User';
import { UserRepository } from '../repository/UserRepository';

export class UserSeed {
  constructor(private readonly repoistoryUser: UserRepository) {}
  async generateFix(listUser: Array<User>) {
    for (var user of listUser) {
      if (user) {
        await this.repoistoryUser.save(user);
      }
    }
  }
}
