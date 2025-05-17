import { GET } from ".";
import { ROUTE_FETCH_CHATS } from "./api";

export const REQUEST_FETCH_CHATS = async (data, params) => {
	const { targetUserId } = params;
	return await GET(`${ROUTE_FETCH_CHATS}/${targetUserId}`, data);
};
