export const load: PageServerLoad = async ({ cookies }) => {
	return{
		currentUserId: cookies.get('currentUserId'),
	}
};
