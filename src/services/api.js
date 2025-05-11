const API_URL = import.meta.env.VITE_API_URL;

const addPrefix = (path) => {
	return `${API_URL}${path}`;
};

//? Auth Apis
export const ROUTE_LOGIN = addPrefix("/login");
export const ROUTE_LOGOUT = addPrefix("/logout");

//? Profile Apis
export const ROUTE_PROFILE_VIEW = addPrefix("/profile/view");
export const ROUTE_PROFILE_EDIT = addPrefix("/profile/edit");

//? User Apis
export const ROUTE_USER_FEED = addPrefix("/user/feed");
export const ROUTE_USER_CONNECTIONS = addPrefix("/user/connections");
export const ROUTE_USER_CONNECTION_REQUESTS = addPrefix("/user/requests/received");

//? Request Apis
export const ROUTE_REVIEW_USER_REQUEST = addPrefix("/request/review");
export const ROUTE_SEND_USER_REQUEST = addPrefix("/request/send");