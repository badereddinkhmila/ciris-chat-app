export const ssr = false;

/** @type {import('./$types').PageLoad} */
export const load = async () => {
	return {
		socket: await import('../store')
	};
};
