import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
	name: "connections",
	initialState: null,
	reducers: {
		storeConnections: (state, action) => {
			return action?.payload;
		},
		removeConnections: () => {
			return null;
		},
	},
});

export const { storeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
