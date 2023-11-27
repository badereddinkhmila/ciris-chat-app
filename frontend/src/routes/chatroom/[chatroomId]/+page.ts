import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/chatroom/[chatroomId]/$types';
import { io } from 'socket.io-client';

export const ssr = false;
export const load: PageLoad = async ({ params, data, parent }) => {
	const parentData = await parent();
	console.log(parentData);
	let isConnected: boolean;
	const socket = io('http://localhost:8000/chat', {
		extraHeaders: {
			Authorization: 'Bearer ' + parentData.accessToken
		}
	});

	socket.on('connect', () => {
		socket.emit('join_chatroom', {
			userId: parentData.currentUser.id,
			chatroomId: params.chatroomId
		});
		isConnected = true;
	});
	socket.on('disconnect', () => {
		isConnected = false;
	});

	return {
		socket: socket,
		chatroomId: params.chatroomId,
		messages: []
	};
};
