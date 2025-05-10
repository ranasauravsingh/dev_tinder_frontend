import { GET, POST } from ".";
import { ROUTE_LOGIN, ROUTE_PROFILE_VIEW } from "./api";

export const REQUEST_LOGIN = async (data) => {
	return await POST(ROUTE_LOGIN, data);
};

export const REQUEST_PROFILE_VIEW = async (data) => {
	return await GET(ROUTE_PROFILE_VIEW, data);
};
