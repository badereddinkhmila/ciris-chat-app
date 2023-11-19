import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessageController {
  @Get()
  findAll(): string {
    return 'Doing nothing for now';
  }
}
