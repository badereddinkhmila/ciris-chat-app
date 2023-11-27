import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../domain/ports/user.repository';

@Injectable()
export default class UsersUsecase {
  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
  ) {}
  public async handleGetAllUsers() {
    return await this._userRepository.getAllUsers();
  }
}
