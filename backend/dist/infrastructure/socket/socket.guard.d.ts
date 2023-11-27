import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class SocketGuard implements CanActivate {
    private _jwtService;
    private _configService;
    constructor(_jwtService: JwtService, _configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    static validateToken(client: Socket, _jwtS: JwtService, _configS: ConfigService): Promise<any>;
}
