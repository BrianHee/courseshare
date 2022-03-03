import React from 'react';
import { Link } from 'react-router-dom';
import { Container, NavItem, Navbar, NavbarBrand } from 'reactstrap';

export interface NavPropsInterface {}

const NavBar: React.FunctionComponent<NavPropsInterface> = (props) => {
	return (
		<Navbar color="light" light sticky="top" expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					CBuilder
				</NavbarBrand>
				{/* {localStorage.getItem('token') && (
					<NavItem>
						<Link to="/" className="nav-link">
							Logout
						</Link>
					</NavItem>
				)} */}
			</Container>
		</Navbar>
	);
};

export default NavBar;
