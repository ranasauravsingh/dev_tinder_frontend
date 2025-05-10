import { GET } from ".";
import { ROUTE_PROFILE_VIEW } from "./api";

export const REQUEST_PROFILE_VIEW = async (data) => {
	return await GET(ROUTE_PROFILE_VIEW, data);
};
