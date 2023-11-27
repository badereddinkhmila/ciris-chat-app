import { AxiosRequest } from '../utils/request';
import { chatroomsStore } from '../index.store';

export interface IMessage {
	id: string;
	message: string;
	createdBy: string;
	createdAt: string;
	deletedAt?: string;
	chatroomId: string;
}

export interface IChatroom {
	id: string;
	users: { id: string }[];
	messages: IMessage[];
}

class Chatroom {
	async instantiateChatroom() {
		try {
			const { data } = await AxiosRequest('users', 'GET');
			chatroomsStore.update((value: IChatroom[]) => data);
			return true;
		} catch (error) {
			return error;
		}
	}

	async getChatroomMessages(_id: string, _lastStamp: Date) {
		try {
			const { data } = await AxiosRequest('chatrooms/' + _id + '/messages', 'GET', {
				chatroomId: _id,
				lastDateFetched: _lastStamp
			});
			chatroomsStore.update((value: IChatroom[]) => {
				value.findLast((room) => room.id == _id)?.messages.push(data);
				return value;
			});
			return true;
		} catch (error) {
			return error;
		}
	}
	async deleteMessages(_roomId: string, _messageId: string) {
		try {
			const { data } = await AxiosRequest(
				'chatrooms/' + _roomId + '/messages/' + _messageId,
				'DELETE'
			);
			const { deletedAt } = data;
			chatroomsStore.update((value: IChatroom[]) => {
				value
					.findLast((room) => room.id === _roomId)
					?.messages.map((message) =>
						message.id === _messageId ? (message.deletedAt = deletedAt) : message
					);
				return value;
			});
			return true;
		} catch (error) {
			return error;
		}
	}
}
export default Chatroom;
