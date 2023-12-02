import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = ({ cookies }) => {
    cookies.delete('currentUserId', {path:'/'});
    cookies.delete('accessToken', {path:'/'});
    cookies.delete('refreshToken', {path:'/'});
    throw redirect(301, '/login');
}