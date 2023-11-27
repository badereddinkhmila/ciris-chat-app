import { Injectable } from '@nestjs/common';
import User from '../../domain/user.model';
import UserCommand from '../commands/user.command';

@Injectable()
export default class UserFactory {
  public createUser(_userCommand: UserCommand): User {
    return new User(
      '',
      _userCommand.firstname,
      _userCommand.lastname,
      _userCommand.email,
      _userCommand.password,
    );
  }
}
