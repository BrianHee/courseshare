import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';

import { RotatingLines } from 'react-loader-spinner';

import styles from './styles.module.scss';
import axios from 'axios';
import 'dotenv/config';
import { UserContext } from '../../context';

const GuestPage: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const [state, setState] = useContext(UserContext);

	const guestLogin = async () => {
		try {
			const response = await axios.post(`${process.env.SERVER_URL}/auth/login`, {
				email: `${process.env.GUEST_EMAIL}`,
				password: `${process.env.GUEST_PASS}`
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
