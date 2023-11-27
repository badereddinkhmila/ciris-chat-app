import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const isAuthenticated = !!event.cookies.get('accessToken');
	if (!isAuthenticated && event.url.pathname.startsWith('/chatroom')) {
		throw redirect(303, '/login');
	}
	if (
		isAuthenticated &&
		(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register'))
	) {
		throw redirect(303, '/chatroom');
	}
	const response = await resolve(event);
	return response;
};
