import { POST } from ".";
import { ROUTE_LOGIN, ROUTE_LOGOUT, ROUTE_SIGNUP } from "./api";

export const REQUEST_LOGIN = async (data) => {
	return await POST(ROUTE_LOGIN, data);
};

export const REQUEST_LOGOUT = async (data) => {
	return await POST(ROUTE_LOGOUT, data);
};

export const REQUEST_SIGNUP = async (data) => {
	return await POST(ROUTE_SIGNUP, data);
};
