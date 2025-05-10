import { POST } from ".";
import { ROUTE_LOGIN } from "./api";

export const REQUEST_LOGIN = async (data) => {
	return await POST(ROUTE_LOGIN, data);
};
