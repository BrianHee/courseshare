import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get user from localStorage
// JSON can only parse strings, so if user is not a string, just parse an empty JSON string

const user = JSON.parse(localStorage.getItem('user') || '{}');

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		}
	},
	extraReducers: () => {}
});

// extraReducers = thunk functions

export const { reset } = authSlice.actions;
export default authSlice.reducer;
