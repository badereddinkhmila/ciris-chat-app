import { UserRepository } from '../domain/ports/user.repository';
export default class UsersUsecase {
    private _userRepository;
    constructor(_userRepository: UserRepository);
    handleGetAllUsers(): Promise<import("../domain/user.model").default[]>;
}
