import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../../../../config/config';
import { UserContext } from '../../../../context';

import styles from './styles.module.scss';

const Footer = () => {
	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const loginUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			const { data: loginData } = await axios.post(config.server.autologin, {
				token
			});
			let response = loginData;

			if (!response.error) {
				setState({
					_id: response.data.user._id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					email: response.data.user.email
				});
				axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
				navigate('/home');
			} else {
				navigate('/login');
			}
		} else {
			navigate('/login');
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h1>Start for free</h1>
				<button className={styles['button']} onClick={loginUser}>
					Sign In
				</button>
				<h2>
					Try{' '}
					<strong>
						course<i>share</i>
					</strong>{' '}
					with{' '}
					<Link to={'/guest'} className={styles.link}>
						Guest Login
					</Link>
				</h2>
			</div>
		</div>
	);
};

export default Footer;
