import { Socket } from 'socket.io';
import { SocketGuard } from './socket.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return async (client, next) => {
    try {
      const payload = await SocketGuard.validateToken(
        client,
        new JwtService(),
        new ConfigService(),
      );
      if (!payload) throw new Error('Invalid token');
      next();
    } catch (e) {
      next(e);
    }
  };
};
