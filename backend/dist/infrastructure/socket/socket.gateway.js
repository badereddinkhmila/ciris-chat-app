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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const socket_guard_1 = require("./socket.guard");
const message_model_1 = require("../../domain/message.model");
const socket_middleware_1 = require("./socket.middleware");
const chatroom_usecase_1 = require("../../application/chatroom.usecase");
let SocketGateway = class SocketGateway {
    constructor(_chatroomUsecase) {
        this._chatroomUsecase = _chatroomUsecase;
        this.logger = new common_1.Logger('ChatGateway');
        this.server = new socket_io_1.Server();
    }
    afterInit(client) {
        client.use((0, socket_middleware_1.SocketAuthMiddleware)());
    }
    async handleChatEvent(payload, client) {
        client.join(payload.chatroomId);
        try {
            const message = await this._chatroomUsecase.handleCreateMessage(payload);
            if (message.isEmpty())
                throw new websockets_1.WsException({
                    code: 500,
                    message: 'Error Creating a message!',
                });
            this.server.to(payload.chatroomId).emit('chat', message.get());
            return message.get();
        }
        catch (error) {
            throw new websockets_1.WsException({
                code: 500,
                message: 'Error Creating a message!',
            });
        }
    }
    async handleSetClientDataEvent(payload, client) {
        if (payload.chatroomId && payload.userId) {
            this.logger.log(`${payload.userId} is joining ${payload.chatroomId}`);
            client.join(payload.chatroomId);
            this.server.in(payload.userId).socketsJoin(payload.chatroomId);
            return;
        }
        console.log('doing it wrong');
        return;
    }
    async handleConnection(client) {
        this.logger.log(`Socket connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Socket connected: ${client.id}`);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_model_1.default,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleChatEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_chatroom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleSetClientDataEvent", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/chat',
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.UseGuards)(socket_guard_1.SocketGuard),
    __param(0, (0, common_1.Inject)(chatroom_usecase_1.default)),
    __metadata("design:paramtypes", [chatroom_usecase_1.default])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map