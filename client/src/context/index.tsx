import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import logging from '../config/logging';

interface User {
	data: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
	error: string | null;
	loading: boolean;
}

const UserContext = createContext<
	[User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}]);

const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({
		data: null,
		loading: true,
		error: null
	});

	const token = localStorage.getItem('token');
	console.log(token);

	if (token) {
		axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
	}

	const fetchUser = async () => {
		console.log('fetching user for context');
		console.log(user);
		try {
			const { data: response } = await axios.get(
				'http://localhost:1337/auth/me'
			);
			if (response.data && response.data.user) {
				setUser({
					data: {
						id: response.data.user.id,
						firstName: response.data.user.firstName,
						lastName: response.data.user.lastName,
						email: response.data.user.email
					},
					loading: false,
					error: null
				});
				console.log('SUCCESS user set');
				console.log(user);
			} else {
				setUser({
					data: null,
					loading: false,
					error: response.error
				});
			}
		} catch (error) {
			logging.error(error);
			setUser({
				data: null,
				loading: false,
				error: null
			});
		}
	};

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({
				data: null,
				loading: false,
				error: null
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
