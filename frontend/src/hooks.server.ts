import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('in server hooks')
	const isAuthenticated = !!event.cookies.get('accessToken');
	const authRoute = event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')
	if (event.url.pathname.startsWith('/signout')) {
		event.cookies.delete('currentUserId', {path:'/'});
		event.cookies.delete('accessToken', {path:'/'});
		event.cookies.delete('refreshToken', {path:'/'});
		throw redirect(301, '/login');
	}
	else if (isAuthenticated && authRoute) {
		throw redirect(301, '/chatroom');
	}
	else if (!isAuthenticated && event.url.pathname.startsWith('/chatroom')) {
		throw redirect(301, '/login');
	}
	const response = await resolve(event);
	return response;
};
