import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

// import PageInterface from '../interfaces/page';
import config from '../config/config';
import { UserContext } from '../context';

const LoginPage: React.FunctionComponent<any> = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

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
			email: response.data.user.email,
			// },
			loading: false
			// error: null
		});

		localStorage.setItem('token', response.data.token);
		axios.defaults.headers.common[
			'authorization'
		] = `Bearer ${response.data.token}`;
		navigate('/home');
	};

	return (
		<div>
			<p>Login Page</p>
			<InputGroup className="mb-3">
				<InputGroup.Text>Email</InputGroup.Text>
				<FormControl
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Text>Password</InputGroup.Text>
				<FormControl
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</InputGroup>
			{errorMsg && errorMsg}
			<Button variant="primary" onClick={handleClick}>
				Login
			</Button>
		</div>
	);
};

export default LoginPage;
