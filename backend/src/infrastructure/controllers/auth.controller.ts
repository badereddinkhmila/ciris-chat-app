import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import AuthUsecase from '../../application/auth.usecase';
import UserCommand from '../../application/commands/user.command';
import LoginCommand from '../../application/commands/login.command';
import { RefreshTokenGuard } from '../auth/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authUsecase: AuthUsecase) {}

  @Post('signup')
  signup(@Body() _userCommand: UserCommand) {
    return this._authUsecase.handleRegister(_userCommand);
  }

  @Post('signin')
  signin(@Body() _loginCommand: LoginCommand) {
    return this._authUsecase.handleLogin(_loginCommand);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() _req: Request) {
    return this._authUsecase.handleRefreshTokens(
      _req.user['sub'],
      _req.user['username'],
    );
  }
}
