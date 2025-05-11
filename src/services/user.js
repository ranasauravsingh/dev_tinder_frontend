import { GET } from ".";
import {
	ROUTE_USER_CONNECTION_REQUESTS,
	ROUTE_USER_CONNECTIONS,
	ROUTE_USER_FEED,
} from "./api";

export const REQUEST_USER_FEED = async (data) => {
	return await GET(ROUTE_USER_FEED, data);
};

export const REQUEST_USER_CONNECTIONS = async (data) => {
	return await GET(ROUTE_USER_CONNECTIONS, data);
};

export const REQUEST_USER_CONNECTION_REQUESTS = async (data) => {
	return await GET(ROUTE_USER_CONNECTION_REQUESTS, data);
};
