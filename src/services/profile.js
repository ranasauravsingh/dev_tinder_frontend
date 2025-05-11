import { GET, PATCH } from ".";
import { ROUTE_PROFILE_EDIT, ROUTE_PROFILE_VIEW } from "./api";

export const REQUEST_PROFILE_VIEW = async (data) => {
	return await GET(ROUTE_PROFILE_VIEW, data);
};

export const REQUEST_PROFILE_EDIT = async (data) => {
	return await PATCH(ROUTE_PROFILE_EDIT, data);
};
