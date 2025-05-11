import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
	name: "requests",
	initialState: null,
	reducers: {
		storeRequests: (state, action) => {
			return action?.payload;
		},
		removeRequests: () => {
			return null;
		},
	},
});

export const { storeRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
