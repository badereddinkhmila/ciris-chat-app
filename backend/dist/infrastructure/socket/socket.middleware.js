"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAuthMiddleware = void 0;
const socket_guard_1 = require("./socket.guard");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const SocketAuthMiddleware = () => {
    return async (client, next) => {
        try {
            const payload = await socket_guard_1.SocketGuard.validateToken(client, new jwt_1.JwtService(), new config_1.ConfigService());
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports.SocketAuthMiddleware = SocketAuthMiddleware;
//# sourceMappingURL=socket.middleware.js.map