import type { Actions, PageServerLoad } from './$types';
import AuthModel, { type IAuth } from '../../store/models/Auth.model';
import { redirect } from '@sveltejs/kit';
import { setCookies } from '../../store/utils/cookies';
import { AxiosError } from 'axios';

export const load = (({ cookies }) => {
	const authToken = cookies.get('authToken');
	if (authToken) return { clearUser: true };
	return { clearUser: true };
}) satisfies PageServerLoad;
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const data = {
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? ''
		};
		try {
			const response: IAuth = await new AuthModel().login(data);
			if(response instanceof AxiosError) throw new Error("Error logging in...")
			setCookies(cookies, response);
			throw redirect(302, '/chatroom');
		} finally {
			/* empty */
		}
	}
} satisfies Actions;
