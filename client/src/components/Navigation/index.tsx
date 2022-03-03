import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';
import ModalComponent from '../Modal';

export interface NavPropsInterface {}

const Navigation: React.FunctionComponent<NavPropsInterface> = (props) => {
	return (
		<Navbar color="light" light sticky="top" expand="md">
			<Container>
				<NavbarBrand tag={Link} to="/">
					CBuilder
				</NavbarBrand>
				<Nav className="mr-auto" navbar />
				<ModalComponent
					text="Login"
					variant="primary"
					isSignupFlow={false}
				/>
				<ModalComponent
					text="Signup"
					variant="secondary"
					isSignupFlow={true}
				/>
			</Container>
		</Navbar>
	);
};

export default Navigation;
