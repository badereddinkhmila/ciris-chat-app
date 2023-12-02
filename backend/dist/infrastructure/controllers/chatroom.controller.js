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
exports.ChatroomController = void 0;
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("../auth/guards/accessToken.guard");
const chatroom_usecase_1 = require("../../application/chatroom.usecase");
const chatroom_command_1 = require("../../application/commands/chatroom.command");
let ChatroomController = class ChatroomController {
    constructor(_chatroomUsecase) {
        this._chatroomUsecase = _chatroomUsecase;
    }
    createChatroom(_req, _chatroomCommand) {
        return this._chatroomUsecase.handleCreate(_chatroomCommand, _req.user['sub']);
    }
    getChatrooms(_req, _userId) {
        if (_userId)
            return this._chatroomUsecase.handleGetByUserIds([
                _req.user['sub'],
                _userId,
            ]);
        return this._chatroomUsecase.handleGetByUserId(_req.user['sub']);
    }
    createMessage(_chatroomID, _req, _message) {
        return this._chatroomUsecase.handleCreateMessage({
            message: _message,
            chatroomId: _chatroomID,
            createdBy: _req.user['sub'],
        });
    }
    getMessages(_chatroomID, lastDate) {
        return this._chatroomUsecase.handleGetMessages({
            chatroomId: _chatroomID,
            lastDateFetched: lastDate,
        });
    }
    deleteMessage(_messageID, _req) {
        return this._chatroomUsecase.handleDeleteMessage(_messageID, _req.user['sub']);
    }
};
exports.ChatroomController = ChatroomController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chatroom_command_1.default]),
    __metadata("design:returntype", void 0)
], ChatroomController.prototype, "createChatroom", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatroomController.prototype, "getChatrooms", null);
__decorate([
    (0, common_1.Post)('/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], ChatroomController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('lastDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChatroomController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Delete)('/:id/messages/:messageID'),
    __param(0, (0, common_1.Param)('messageID')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatroomController.prototype, "deleteMessage", null);
exports.ChatroomController = ChatroomController = __decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('chatrooms'),
    __metadata("design:paramtypes", [chatroom_usecase_1.default])
], ChatroomController);
//# sourceMappingURL=chatroom.controller.js.map