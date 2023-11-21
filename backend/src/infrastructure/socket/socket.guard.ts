import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private _jwtService: JwtService,
    @Inject(ConfigService) private _configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const payload = SocketGuard.validateToken(
      client,
      this._jwtService,
      this._configService,
    );
    return true;
  }

  static async validateToken(
    client: Socket,
    _jwtS: JwtService,
    _configS: ConfigService,
  ) {
    const { authorization } = client.handshake.headers;
    if (!authorization)
      throw new WsException({ code: 401, message: 'Unauthenticated !' });
    const auth_token = authorization.split(' ')[1];
    return _jwtS.verify(auth_token, {
      secret: _configS.get<string>('JWT_ACCESS_SECRET'),
    });
  }
}
