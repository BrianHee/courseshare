import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PageInterface from '../interfaces/page';
import config from '../config/config';
import { UserContext } from '../context';

const RegisterPage: React.FunctionComponent<PageInterface> = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const handleClick = async () => {
		const { data: registerData } = await axios.post(config.server.register, {
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
			<form>
				<label>First name</label>
				<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				<label>Last name</label>
				<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				<label>Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<label>Password</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<label>Confirm password</label>
				<input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
				{errorMsg && errorMsg}
				<button onClick={handleClick}>Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
