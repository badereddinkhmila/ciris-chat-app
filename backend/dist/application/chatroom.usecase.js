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
const common_1 = require("@nestjs/common");
const chatroom_factory_1 = require("./factories/chatroom.factory");
const message_factory_1 = require("./factories/message.factory");
let ChatroomUsecase = class ChatroomUsecase {
    constructor(_chatroomRepository, _messageRepository, _chatroomFactory, _messageFactory) {
        this._chatroomRepository = _chatroomRepository;
        this._messageRepository = _messageRepository;
        this._chatroomFactory = _chatroomFactory;
        this._messageFactory = _messageFactory;
    }
    handleCreate(_chatroomCommand, _connectedUserID) {
        if (Array.from(new Set(_chatroomCommand.users.map((item) => item.id)))
            .length != 2 ||
            !_chatroomCommand.users.some((user) => user.id === _connectedUserID))
            throw new common_1.BadRequestException('Chatroom requires two different users!');
        const chatroom = this._chatroomFactory.createChatroom(_chatroomCommand);
        try {
            return this._chatroomRepository.createChatroom(chatroom);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error inserting...');
        }
    }
    handleGetByUserId(_connectedUserID) {
        try {
            return this._chatroomRepository.getByUserID(_connectedUserID);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error fetching...');
        }
    }
    async handleGetByUserIds(_userIds) {
        try {
            const chatrooms = await this._chatroomRepository.getByUserID(_userIds[0]);
            return chatrooms.find((room) => {
                let satisfiesRequirements = true;
                room.users.forEach((user) => {
                    if (!_userIds.includes(user.id))
                        satisfiesRequirements = false;
                });
                return satisfiesRequirements;
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error fetching...');
        }
    }
    handleGetMessages(_messageFilter) {
        return this._messageRepository.getMessagesByChatroom(_messageFilter.chatroomId, _messageFilter.lastDateFetched);
    }
    handleCreateMessage(_messageCommand) {
        const message = this._messageFactory.createMessage(_messageCommand);
        try {
            return this._messageRepository.createMessage(message);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Error inserting...',
                statusCode: 500,
            });
        }
    }
    async handleDeleteMessage(_messageID, _userID) {
        const message = await this._messageRepository.getMessagesByID(_messageID);
        if (message.isPresent() && message.get().createdBy != _userID)
            throw new common_1.UnauthorizedException("You're not allowed to alter this resource");
        try {
            return await this._messageRepository.softDeleteMessage(_messageID);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Error deleting...',
                statusCode: 500,
            });
        }
    }
};
ChatroomUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ChatroomRepository')),
    __param(1, (0, common_1.Inject)('MessageRepository')),
    __metadata("design:paramtypes", [Object, Object, chatroom_factory_1.default,
        message_factory_1.default])
], ChatroomUsecase);
exports.default = ChatroomUsecase;
//# sourceMappingURL=chatroom.usecase.js.map