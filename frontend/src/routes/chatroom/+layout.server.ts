import type { LayoutServerData } from '../../../.svelte-kit/types/src/routes/chatroom/$types';
import type { IUser } from '../../store/models/Users.model';
import { AxiosRequest } from '../../store/utils/request';
import type { AxiosResponse } from 'axios';
import type { IChatroom } from '../../store/models/Chatrooms.model';
import { AxiosError } from 'axios';

export const load: LayoutServerData = async ({ cookies }) => {
	try {
		const users: AxiosResponse<IUser[], Error> = await AxiosRequest(
			'users',
			'GET',
			undefined,
			cookies.get('accessToken')
		);
		const chatrooms: AxiosResponse<IChatroom[], Error> = await AxiosRequest(
			'chatrooms',
			'GET',
			undefined,
			cookies.get('accessToken')
		);
		if (users instanceof AxiosError || chatrooms instanceof AxiosError)
			console.log('Something went wrong!');

		const currentUser = users.data.find((user) => user.id === cookies.get('currentUserId'));

		return {
			users: users.data,
			chatrooms: chatrooms.data,
			currentUser: currentUser,
			accessToken: cookies.get('accessToken')
		};
	} catch (error) {
		console.log(error);
		return error;
	}
};
