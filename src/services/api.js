const API_URL = "http://localhost:7777";

const addPrefix = (path) => {
	return `${API_URL}${path}`;
};

export const ROUTE_LOGIN = addPrefix("/login");
