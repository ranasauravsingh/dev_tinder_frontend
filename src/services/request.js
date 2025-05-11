import { POST } from ".";
import { ROUTE_REVIEW_USER_REQUEST } from "./api";

export const REQUEST_REVIEW_USER_REQUEST = async (data, params) => {
	const { status, fromUserId } = params;
	return await POST(
		`${ROUTE_REVIEW_USER_REQUEST}/${status}/${fromUserId}`,
		data
	);
};
