import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
	name: "feed",
	initialState: null,
	reducers: {
		storeFeed: (state, action) => {
			return action?.payload;
		},
	},
});

export const { storeFeed } = feedSlice.actions;

export default feedSlice.reducer;
