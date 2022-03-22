import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import PageInterface from '../interfaces/page';
import config from '../config/config';
import { UserContext } from '../context';

const LoginPage: React.FunctionComponent<any> = (props) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const handleClick = async () => {
		const { data: loginData } = await axios.post(config.server.login, {
			email,
			password
		});
		let response = loginData;

		if (response.errors.length) {
			return setErrorMsg(response.errors[0]);
		}

		setState({
			// data: {
			_id: response.data.user._id,
			firstName: response.data.user.firstName,
			lastName: response.data.user.lastName,
			email: response.data.user.email
			// },
			// loading: false
			// error: null
		});

		localStorage.setItem('token', response.data.token);
		axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
		navigate('/home');
	};

	return (
		<div>
			<p>Login Page</p>
			<form>
				<label>Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				{errorMsg && errorMsg}
				<button onClick={handleClick}>Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
