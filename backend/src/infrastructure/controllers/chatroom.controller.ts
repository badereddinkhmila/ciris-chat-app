import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import ChatroomUsecase from '../../application/chatroom.usecase';
import ChatroomCommand from '../../application/commands/chatroom.command';

@UseGuards(AccessTokenGuard)
@Controller('chatrooms')
export class ChatroomController {
  constructor(private _chatroomUsecase: ChatroomUsecase) {}

  @Post()
  createChatroom(
    @Req() _req: Request,
    @Body() _chatroomCommand: ChatroomCommand,
  ) {
    return this._chatroomUsecase.handleCreate(
      _chatroomCommand,
      _req.user['sub'],
    );
  }

  @Get()
  getChatrooms(@Req() _req: Request) {
    return this._chatroomUsecase.handleGetByUserId(_req.user['sub']);
  }

  @Post('/isCreated')
  checkChatroomExist(@Req() _req: Request, @Body('userID') _userID: string) {
    return this._chatroomUsecase.handleGetByUserIds([
      _req.user['sub'],
      _userID,
    ]);
  }

  @Post('/:id/messages')
  createMessage(
    @Param('id') _chatroomID: string,
    @Req() _req: Request,
    @Body('message') _message: string,
  ) {
    return this._chatroomUsecase.handleCreateMessage({
      message: _message,
      chatroomId: _chatroomID,
      createdBy: _req.user['sub'],
    });
  }

  @Get('/:id/messages')
  getMessages(
    @Param('id') _chatroomID: string,
    @Query('lastDate') lastDate: string,
  ) {
    return this._chatroomUsecase.handleGetMessages({
      chatroomId: _chatroomID,
      lastDateFetched: lastDate,
    });
  }

  @Delete('/:id/messages/:messageID')
  deleteMessage(@Param('messageID') _messageID: string, @Req() _req: Request) {
    return this._chatroomUsecase.handleDeleteMessage(
      _messageID,
      _req.user['sub'],
    );
  }
}
