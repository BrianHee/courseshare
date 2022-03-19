import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Misc/Header';
import Navigation from '../components/Misc/Navigation';

const LandingPage: React.FunctionComponent<any> = (props) => {
	return (
		<Container fluid className="p-0">
			<Navigation />
			<Header title="Course builder" />
			<Container className="mt-5">Course stuff here</Container>
		</Container>
	);
};

export default LandingPage;
