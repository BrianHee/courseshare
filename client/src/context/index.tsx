import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import logging from '../config/logging';

interface User {
	// data: {
	// 	id: string;
	// 	firstName: string;
	// 	lastName: string;
	// 	email: string;
	// };
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	// error: string;
	loading: boolean;
}

const UserContext = createContext<
	[User, React.Dispatch<React.SetStateAction<User>>]
>([
	{
		_id: '',
		firstName: '',
		lastName: '',
		email: '',
		loading: true
		// error: ''
	},
	() => {}
]);

const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({
		_id: '',
		firstName: '',
		lastName: '',
		email: '',
		loading: true
		// error: null
	});

	const token = localStorage.getItem('token');

	if (token) {
		axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
	}

	const fetchUser = async () => {
		try {
			const { data: response } = await axios.get(
				'http://localhost:1337/auth/me'
			);
			if (response.data && response.data.user) {
				setUser({
					// data: {
					_id: response.data.user._id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					email: response.data.user.email,
					// },
					loading: false
					// error: null
				});
			} else {
				setUser({
					// data: null,
					_id: '',
					firstName: '',
					lastName: '',
					email: '',
					loading: false
					// error: response.error
				});
			}
		} catch (error) {
			logging.error(error);
			setUser({
				// data: null,
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				loading: false
				// error: null
			});
		}
	};

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({
				// data: null,
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				loading: false
				// error: null
			});
		}
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
