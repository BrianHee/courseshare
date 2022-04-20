import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import config from '../../../../config/config';
import { UserContext } from '../../../../context';
import logo from '../../../../assets/logo.png';
import logo2 from '../../../../assets/logo2.png';

import styles from './styles.module.scss';

export interface NavPropsInterface {}

const LandingNav: React.FunctionComponent<NavPropsInterface> = (props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [scrollTrans, setScrollTrans] = useState<boolean>(false);

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

	const transitionNav = () => {
		let mouseX = window.scrollY;
		let nav = document.getElementById('navbar');
		if (nav && mouseX > 30) {
			setScrollTrans(true);
			nav.style.background = '#ffffff';
			nav.style.transition = 'background 0.75s';
		} else {
			setScrollTrans(false);
			nav!.style.background = 'rgba(0,0,0,0)';
			nav!.style.transition = 'background 0.75s';
		}
	};
	window.addEventListener('scroll', transitionNav);

	return (
		<div className={styles['navbar']} id="navbar">
			<div className={styles.container}>
				<div className={styles['logo']}>
					<Link to="/">
						<img src={scrollTrans ? logo2 : logo} alt="logo" />
					</Link>
				</div>
				<div className={styles['button-wrapper']}>
					<button
						className={
							scrollTrans ? `${styles['button-transition']} ${styles['button']}` : styles['button']
						}
						onClick={loginUser}
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingNav;
