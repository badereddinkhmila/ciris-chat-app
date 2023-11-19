import User from '../../domain/user.model';
import UserCommand from '../commands/user.command';
export default class UserFactory {
    createUser(_userCommand: UserCommand): User;
}
