import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import config from '../../config/config';

// Realistically should separate signup/login modals

interface ModalPropsIfc {
	text: string;
	variant: 'primary' | 'secondary';
	isSignupFlow: boolean;
}

const ModalComponent = (props: ModalPropsIfc) => {
	const { text, variant, isSignupFlow } = props;
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleShow = () => {
		show ? setShow(false) : setShow(true);
	};

	const navigate = useNavigate();

	const handleClick = async () => {
		let data;
		if (isSignupFlow) {
			const { data: signUpData } = await axios.post(
				config.server.signup,
				{
					email,
					password
				}
			);
			data = signUpData;
		} else {
			const { data: loginData } = await axios.post(config.server.login, {
				email,
				password
			});
			data = loginData;
		}

		if (data.errors.length) {
			return setErrorMsg(data.errors[0].msg);
		}

		//return prevents login if credentials are incorrect

		localStorage.setItem('token', data.data.token);
		navigate('/course');
	};

	return (
		<>
			<Button
				onClick={handleShow}
				variant={variant}
				size="lg"
				style={{ marginRight: '1rem', padding: '0.5rem' }}
			>
				{text}
			</Button>
			<Modal show={show} onHide={handleShow}>
				<Modal.Header>
					<Modal.Title>{text}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleShow}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClick}>
						{text}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalComponent;
