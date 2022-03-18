import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Container, NavItem, Navbar, NavbarBrand } from 'reactstrap';

import { UserContext } from '../../../context';

export interface NavPropsInterface {}

const NavBar: React.FunctionComponent<NavPropsInterface> = (props) => {
	const [state, setState] = useContext(UserContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		setState({
			_id: '',
			firstName: '',
			lastName: '',
			email: ''
			// loading: false
			// error: null
		});
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<Navbar color="light" light sticky="top" expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					CBuilder
				</NavbarBrand>
			</Container>
			{state._id && (
				<NavLink to="/" onClick={handleLogout}>
					LogOut
				</NavLink>
			)}
		</Navbar>
	);
};

export default NavBar;
