import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context';

import styles from './styles.module.scss';

const LoginPage: React.FunctionComponent<any> = (props) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const handleClick = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
				email,
				password
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
				setError('Invalid credentials');
			}
		} catch (error) {
			setError('Invalid credentials');
		}
	};

	return (
		<div className={styles['container']}>
			<div className={styles['form-container']}>
				<div className={styles['title']}>Welcome!</div>
				<form onSubmit={handleClick}>
					<div className={styles['email']}>
						<input
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles['password']}>
						<input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={styles['error']}>{error ? error : ''}</div>
					<button className={styles['login']} type="submit">
						Sign In
					</button>
					<div className={styles.register}>
						Don't have an account?{' '}
						<Link className={styles.link} to={'/register'}>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
