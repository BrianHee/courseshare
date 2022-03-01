import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';

export interface NavPropsInterface {}

const Navigation: React.FunctionComponent<NavPropsInterface> = (props) => {
	return (
		<Navbar color="light" light sticky="top" expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					CBuilder
				</NavbarBrand>
				<Nav className="mr-auto" navbar />
			</Container>
		</Navbar>
	);
};

export default Navigation;
