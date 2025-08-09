import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const POST = async (api_url, data) => {
	const headers = {
		"Content-Type": "application/json",
	};
	return await axios.post(api_url, data, { withCredentials: true, headers });
};

export const GET = async (api_url, data) => {
	const headers = {
		"Content-Type": "application/json",
	};
	return await axios.get(api_url, { params: data, withCredentials: true, headers });
};

export const PATCH = async (api_url, data) => {
	const headers = {
		"Content-Type": "application/json",
	};
	return await axios.patch(api_url, data, { withCredentials: true, headers });
};
