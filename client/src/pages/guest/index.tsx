import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RotatingLines } from 'react-loader-spinner';

import styles from './styles.module.scss';
import axios from 'axios';
import { UserContext } from '../../context';

const GuestPage: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [state, setState] = useContext(UserContext);

	const guestLogin = async () => {
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
				email: `${process.env.REACT_APP_GUEST_EMAIL}`,
				password: `${process.env.REACT_APP_GUEST_PASS}`
			});

			if (response.status === 200) {
				setState({
					_id: response.data.data.user._id,
					firstName: response.data.data.user.firstName,
					lastName: response.data.data.user.lastName,
					email: response.data.data.user.email
				});
				localStorage.setItem('token', response.data.data.token);
				axios.defaults.headers.common['authorization'] = `Bearer ${response.data.data.token}`;
				navigate('/home');
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	useEffect(() => {
		setTimeout(() => guestLogin(), 1000);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Authenticating Guest Login</h1>
				<div className={styles.spinner}>
					<RotatingLines width="50" strokeColor="#83c3ff" />
				</div>
			</div>
		</div>
	);
};

export default GuestPage;
