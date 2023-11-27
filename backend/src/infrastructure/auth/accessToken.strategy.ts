import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(_configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.accessToken) {
      console.log(req.cookies.accessToken);
      return req.cookies.accessToken;
    }
    return null;
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
