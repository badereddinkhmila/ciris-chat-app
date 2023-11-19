import { Optional } from 'typescript-optional';
import UserFactory from './factories/user.factory';
import { UserRepository } from '../domain/ports/user.repository';
import User from '../domain/user.model';
import UserCommand from './commands/user.command';
export default class MessageUsecase {
    private _userRepository;
    private _userFactory;
    constructor(_userRepository: UserRepository, _userFactory: UserFactory);
    handler(_userCommand: UserCommand): Promise<Optional<User>>;
}
