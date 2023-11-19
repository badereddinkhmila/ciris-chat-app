import { Injectable, Inject } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import UserFactory from './factories/user.factory';
import { UserRepository } from '../domain/ports/user.repository';
import User from '../domain/user.model';
import UserCommand from './commands/user.command';

@Injectable()
export default class MessageUsecase {
  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _userFactory: UserFactory,
  ) {}
  public handler(_userCommand: UserCommand): Promise<Optional<User>> {
    const user = this._userFactory.createUser(_userCommand);
    return this._userRepository.createUser(user);
  }
}
