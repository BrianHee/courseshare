import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
}

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
	{
		_id: '',
		firstName: '',
		lastName: '',
		email: ''
	},
	() => {}
]);

const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({
		_id: 'temp',
		firstName: '',
		lastName: '',
		email: ''
	});

	const token = localStorage.getItem('token');

	if (token) {
		axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
	}

	const fetchUser = async () => {
		try {
			const { data: response } = await axios.get(`${config.server.url}/auth/me`);
			if (response.data && response.data.user) {
				setUser({
					_id: response.data.user._id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					email: response.data.user.email
				});
			} else {
				setUser({
					_id: '',
					firstName: '',
					lastName: '',
					email: ''
				});
			}
		} catch (error) {
			setUser({
				_id: '',
				firstName: '',
				lastName: '',
				email: ''
			});
		}
	};

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({
				_id: '',
				firstName: '',
				lastName: '',
				email: ''
			});
		}
	}, []);

	return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
