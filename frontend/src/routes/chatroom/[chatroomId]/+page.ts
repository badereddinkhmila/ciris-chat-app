import { PUBLIC_BROWSER_BACKEND_URL } from '$env/static/public';
import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/chatroom/[chatroomId]/$types';
import { io } from 'socket.io-client';
import { AxiosRequest } from '../../../store/utils/request';
import { AxiosError } from 'axios';

export const ssr = false;
export const load: PageLoad = async ({ params, parent }) => {
	const parentData = await parent();
	let isConnected: boolean= false;
	const url:string = `chatrooms/${params.chatroomId}/messages?lastDate=${new Date().toISOString()}`
	const response = AxiosRequest(url,'GET',undefined, parentData.accessToken)
	if(response instanceof AxiosError) throw new Error('Error getting messages from backend');

	const socket = io(PUBLIC_BROWSER_BACKEND_URL+'/chat', {
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
		isConnected: isConnected,
		messages: (await response).data
	};
};
