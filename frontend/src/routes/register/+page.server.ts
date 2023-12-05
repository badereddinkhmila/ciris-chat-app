import type { Actions, PageServerLoad } from './$types';
import AuthModel from '../../store/models/Auth.model';
import { redirect } from '@sveltejs/kit';
import { setCookies } from '../../store/utils/cookies';
import { AxiosError } from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load = (({ cookies }) => {
	const authStore = cookies.get('authStore');
	if (authStore) return { clearUser: true };
	return { clearUser: true };
}) satisfies PageServerLoad;
export const actions = {
	default: async ({ request, cookies }) => {
		console.log(PUBLIC_BACKEND_URL)
		const formData = await request.formData();
		const data = {
			firstname: formData.get('firstname')?.toString() ?? '',
			lastname: formData.get('lastname')?.toString() ?? '',
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? ''
		};
		try {
			const response = await new AuthModel().register(data);
			console.log(response)
			if(response instanceof AxiosError) throw new Error("Error registering in...")
			setCookies(cookies, response?.data);
			throw redirect(301, '/chatroom');
		} finally {
			/* empty */
		}
	}
} satisfies Actions;
