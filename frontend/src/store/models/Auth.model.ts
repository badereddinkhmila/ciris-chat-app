import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { AxiosRequest } from '../utils/request';
import { redirect } from '@sveltejs/kit';
export interface IAuth {
	accessToken: string;
	refreshToken: string;
	currentUserId: string;
}

class Auth {
	async refreshAccessToken() {
		console.log('refreshingToken model', sessionStorage.getItem('refreshToken'));
		const cookie = sessionStorage.getItem('refreshToken');
		if (!cookie) throw redirect(301, '/login');
		const authStore = JSON.parse(cookie);
		const { data } = await axios.get(PUBLIC_BACKEND_URL + '/api/v1/auth/refresh', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authStore.refreshToken
			}
		});
		sessionStorage.setItem('authStore', JSON.stringify(authStore));
		return data;
	}

	async login(_data: { email: string; password: string }) {
		try {
			const { data } = await AxiosRequest('auth/signin', 'POST', _data);
			return data;
		} catch (error) {
			return error;
		}
	}

	async register(_data: { firstname: string; lastname: string; email: string; password: string }) {
		try {
			const { data } = await AxiosRequest('auth/signup', 'POST', _data);
			return data;
		} catch (error) {
			return error;
		}
	}
}
export default Auth;
