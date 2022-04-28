import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PageInterface from '../../interfaces/page';
import 'dotenv/config';
import { UserContext } from '../../context';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const RegisterPage: React.FunctionComponent<PageInterface> = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const handleClick = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const { data: registerData } = await axios.post(`${process.env.SERVER_URL}/auth/register`, {
			firstName,
			lastName,
			email,
			password,
			password2
		});
		let response = registerData;

		if (response.errors.length) {
			return setErrorMsg(response.errors[0]);
		}

		setState({
			_id: response.data.user._id,
			firstName: response.data.user.firstName,
			lastName: response.data.user.lastName,
			email: response.data.user.email
		});

		localStorage.setItem('token', response.data.token);
		axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
		navigate('/home');
	};

	return (
		<div className={styles['container']}>
			<div className={styles['form-wrapper']}>
				<div className={styles['title']}>
					Create your course<b>share</b> account
				</div>
				<form className={styles['registration-form']}>
					<div className={styles['name']}>
						<input
							placeholder="First name"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<input
							placeholder="Last name"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div>
						<input
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<input
							placeholder="Confirm password"
							type="password"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
						/>
					</div>
					<div className={styles['error']}>{errorMsg && errorMsg}</div>
					<button className={styles['register']} onClick={handleClick}>
						Register
					</button>
				</form>
				<div className={styles.login}>
					Already have an account?{' '}
					<Link className={styles.link} to={'/login'}>
						Log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
