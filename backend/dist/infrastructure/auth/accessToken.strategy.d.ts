import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
type JwtPayload = {
    sub: string;
    username: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor(_configService: ConfigService);
    private static extractJWTFromCookie;
    validate(payload: JwtPayload): JwtPayload;
}
export {};
