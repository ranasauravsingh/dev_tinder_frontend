import io from "socket.io-client";

export const createSocketConnection = () => {
	const isProduction = import.meta.env.PROD;
	const API_URL = import.meta.env.VITE_API_URL;

	if (isProduction) {
		return io("/", { path: "/api/socket.io" });
	} else {
		return io(API_URL);
	}
};
