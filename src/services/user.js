import { GET } from ".";
import { ROUTE_USER_FEED } from "./api";

export const REQUEST_USER_FEED = async (data) => {
	return await GET(ROUTE_USER_FEED, data);
};
