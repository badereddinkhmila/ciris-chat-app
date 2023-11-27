import type { Cookies } from '@sveltejs/kit';
import type { IAuth } from '../models/Auth.model';

export function setCookies(cookies: Cookies, response: IAuth) {
	cookies.set('accessToken', response.accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 7 * 24,
		sameSite: 'lax'
	});
	cookies.set('refreshToken', response.refreshToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 7 * 24,
		sameSite: 'lax'
	});
	cookies.set('currentUserId', response.currentUserId, {
		httpOnly: true,
		maxAge: 60 * 60 * 7 * 24,
		sameSite: 'lax'
	});
}
