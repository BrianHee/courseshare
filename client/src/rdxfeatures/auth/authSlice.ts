import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
// JSON can only parse strings, so if user is not a string, just parse an empty JSON string

// const user = JSON.parse(localStorage.getItem('token') || '{}');
const user = localStorage.getItem('token') || '';

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// Register user
// export const register = createAsyncThunk(
// 	'auth/register',
// 	async (user, thunkAPI) => {
// 		try {
// 			return await authService.register(user);
// 		} catch (error) {}
// 	}
// );

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
