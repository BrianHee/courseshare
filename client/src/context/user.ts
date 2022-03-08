import { DEFAULT_USER, DEFAULT_TOKEN } from './../interfaces/user';
import { createContext } from 'react';
import IUser from '../interfaces/user';

export interface IUserState {
	user: IUser;
	token: string;
}

export interface IUserActions {
	type: 'login' | 'logout' | 'authenticate';
	payload: {
		user: IUser;
		token: string;
	};
}

export const initialUserState: IUserState = {
	user: DEFAULT_USER,
	token: DEFAULT_TOKEN
};

export const userReducer = (state: IUserState, action: IUserActions) => {
	let user = action.payload.user;
	let token = action.payload.token;

	switch (action.type) {
		case 'login':
			localStorage.setItem('token', token);

			return { user, token };
		case 'logout':
			localStorage.removeItem('token');

			return initialUserState;
		default:
			return state;
	}
};

export interface IUserContextProps {
	userState: IUserState;
	userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
	userState: initialUserState,
	userDispatch: () => {}
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;
