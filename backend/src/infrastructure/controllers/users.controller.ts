import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import UsersUsecase from '../../application/users.usecase';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private _usersUsecase: UsersUsecase) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers() {
    return this._usersUsecase.handleGetAllUsers();
  }
}
