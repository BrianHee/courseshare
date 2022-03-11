import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

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

	if (token) {
		axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
	}

	const fetchUser = async () => {
		const { data: response } = await axios.get(
			'http://localhost:1337/auth/me'
		);

		if (response.data && response.data.user) {
			setUser({
				data: {
					id: response.data.user.id,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.user.email
				},
				loading: false,
				error: null
			});
		} else if (response.data && response.data.errors.length) {
			setUser({
				data: null,
				loading: false,
				error: response.errors[0].msg
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
