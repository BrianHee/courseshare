import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import config from '../../../../config/config';
import { UserContext } from '../../../../context';
import LoadComponent from '../../../../components/Misc/Loading';
import logo from '../../../../assets/logo.png';

import styles from './styles.module.scss';

export interface NavPropsInterface {}

const LandingNav: React.FunctionComponent<NavPropsInterface> = (props) => {
	const [loading, setLoading] = useState(false);
	const [scrollTrans, setScrollTrans] = useState(false);

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const loginUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			setLoading(true);
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
					// loading: false
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

	const callScrollTrans = () => {
		if (window.scrollY >= 5) {
			setScrollTrans(true);
		} else {
			setScrollTrans(false);
		}
	};
	window.addEventListener('scroll', callScrollTrans);

	return (
		<div className={styles['navbar']}>
			<div className="logo">
				<Link to="/">
					<img src={logo} alt="logo" height="40" />
				</Link>
			</div>
			<div className={styles['container']}>
				<button className={styles['login-button']} onClick={loginUser}>
					{loading ? <LoadComponent /> : 'Login'}
				</button>
				<Link to="/register">Register</Link>
			</div>
		</div>
	);
};

export default LandingNav;
