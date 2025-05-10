const API_URL = "http://localhost:7777";

const addPrefix = (path) => {
	return `${API_URL}${path}`;
};

//? Auth Apis
export const ROUTE_LOGIN = addPrefix("/login");
export const ROUTE_LOGOUT = addPrefix("/logout");

//? Profile Apis
export const ROUTE_PROFILE_VIEW = addPrefix("/profile/view");
