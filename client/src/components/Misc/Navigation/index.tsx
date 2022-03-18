import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

// import PageInterface from '../interfaces/page';
import config from '../../../config/config';
import { UserContext } from '../../../context';

export interface NavPropsInterface {}

const Navigation: React.FunctionComponent<NavPropsInterface> = (props) => {
	const navigate = useNavigate();

	const [state, setState] = useContext(UserContext);

	const loginUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			const { data: loginData } = await axios.post(
				config.server.autologin,
				{
					token
				}
			);
			let response = loginData;
			console.log('token available');

			if (!response.error) {
				setState({
					_id: response.data.user._id,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					email: response.data.user.email,
					loading: false
				});
				axios.defaults.headers.common[
					'authorization'
				] = `Bearer ${token}`;
				navigate('/home');
			} else {
				navigate('/login');
			}
		} else {
			navigate('/login');
		}
	};

	return (
		<Navbar color="light" light sticky="top" expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					CBuilder
				</NavbarBrand>
				<Nav className="mr-auto" navbar />
				<button onClick={loginUser}>Login</button>
				<Link to="/register">Register</Link>
			</Container>
		</Navbar>
	);
};

export default Navigation;