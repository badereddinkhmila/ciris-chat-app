import UsersUsecase from '../../application/users.usecase';
export declare class UsersController {
    private _usersUsecase;
    constructor(_usersUsecase: UsersUsecase);
    getAllUsers(): Promise<import("../../domain/user.model").default[]>;
}
