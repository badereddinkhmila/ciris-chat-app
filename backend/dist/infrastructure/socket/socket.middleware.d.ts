import { Socket } from 'socket.io';
export type SocketIOMiddleware = {
    (client: Socket, next: (err?: Error) => void): any;
};
export declare const SocketAuthMiddleware: () => SocketIOMiddleware;
