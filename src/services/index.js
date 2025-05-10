import axios from "axios";

export const POST = async (api_url, data) => {
	return await axios.post(api_url, data, { withCredentials: true });
};

export const GET = async (api_url, data) => {
	return await axios.get(api_url, { params: data, withCredentials: true });
};
