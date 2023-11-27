import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const apiPrefix = PUBLIC_BACKEND_URL + '/api/v1/';
const axiosApiInstance = axios.create();

// Response interceptor for API calls
/*axiosApiInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const { accessToken } = await new Auth().refreshAccessToken();
			if (!accessToken) return Promise.reject(error);
			return axiosApiInstance(originalRequest);
		}
		return Promise.reject(error);
	}
);
*/
export const AxiosRequest = (
	url: string,
	method: string,
	data: any = undefined,
	accessToken: string | null | undefined = undefined
) => {
	return axiosApiInstance({
		method: method,
		url: apiPrefix + url,
		data: data,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken ? 'Bearer ' + accessToken : undefined
		}
	});
};
