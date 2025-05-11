import { POST } from ".";
import { ROUTE_REVIEW_USER_REQUEST, ROUTE_SEND_USER_REQUEST } from "./api";

export const REQUEST_REVIEW_USER_REQUEST = async (data, params) => {
	const { status, fromUserId } = params;
	return await POST(
		`${ROUTE_REVIEW_USER_REQUEST}/${status}/${fromUserId}`,
		data
	);
};

export const REQUEST_SEND_USER_REQUEST = async (data, params) => {
	const { status, toUserId } = params;
	return await POST(`${ROUTE_SEND_USER_REQUEST}/${status}/${toUserId}`, data);
};
