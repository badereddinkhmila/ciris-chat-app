"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SocketGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const websockets_1 = require("@nestjs/websockets");
let SocketGuard = SocketGuard_1 = class SocketGuard {
    constructor(_jwtService, _configService) {
        this._jwtService = _jwtService;
        this._configService = _configService;
    }
    canActivate(context) {
        if (context.getType() !== 'ws') {
            return true;
        }
        const client = context.switchToWs().getClient();
        const payload = SocketGuard_1.validateToken(client, this._jwtService, this._configService);
        return true;
    }
    static async validateToken(client, _jwtS, _configS) {
        const { authorization } = client.handshake.headers;
        if (!authorization)
            throw new websockets_1.WsException({ code: 401, message: 'Unauthenticated !' });
        const auth_token = authorization.split(' ')[1];
        return _jwtS.verify(auth_token, {
            secret: _configS.get('JWT_ACCESS_SECRET'),
        });
    }
};
exports.SocketGuard = SocketGuard;
exports.SocketGuard = SocketGuard = SocketGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(1, (0, common_1.Inject)(config_1.ConfigService)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], SocketGuard);
//# sourceMappingURL=socket.guard.js.map