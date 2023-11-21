import { io, Socket } from 'socket.io-client';
import type { Message } from '../models/message';

const socket: Socket = io('http://localhost:8000/chat', {
	autoConnect: false
});

socket.on('connect', () => {
	console.log('connexion good');
});

socket.on('chat', (message: Message) => {
	console.log(message);
});
