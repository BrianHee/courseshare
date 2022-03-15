import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const LandingPage: React.FunctionComponent<any> = (props) => {
	return (
		<Container fluid className="p-0">
			<Navigation />
			<Header title="Course builder" headline="Check out my courses" />
			<Container className="mt-5">Course stuff here</Container>
		</Container>
	);
};

export default LandingPage;
