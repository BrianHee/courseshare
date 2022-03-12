import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

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
		const { data: registerData } = await axios.post(
			config.server.register,
			{
				firstName,
				lastName,
				email,
				password,
				password2
			}
		);
		let response = registerData;

		if (response.errors.length) {
			return setErrorMsg(response.errors[0]);
		}

		setState({
			data: {
				id: response.data.user.id,
				firstName: response.data.firstName,
				lastName: response.data.lastName,
				email: response.data.user.email
			},
			loading: false,
			error: null
		});

		localStorage.setItem('token', response.data.token);
		axios.defaults.headers.common[
			'authorization'
		] = `Bearer ${response.data.token}`;
		navigate('/course');
	};

	return (
		<div>
			<InputGroup className="mb-3">
				<InputGroup.Text>First name</InputGroup.Text>
				<FormControl
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Text>Last name</InputGroup.Text>
				<FormControl
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</InputGroup>
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
			<InputGroup className="mb-3">
				<InputGroup.Text>Confirm password</InputGroup.Text>
				<FormControl
					type="password"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
				/>
			</InputGroup>
			{errorMsg && errorMsg}
			<Button variant="primary" onClick={handleClick}>
				Register
			</Button>
		</div>
	);
};

export default RegisterPage;
