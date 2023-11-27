import { AxiosRequest } from '../utils/request';
import { usersStore } from '../index.store';

export interface IUser {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
}

class User {
	async getAllUsers() {
		try {
			const { data } = await AxiosRequest('users', 'GET');
			usersStore.update((value: IUser[]) => data);
			return data;
		} catch (error) {
			return error;
		}
	}
}
export default User;
