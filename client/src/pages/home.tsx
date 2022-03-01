import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import PageInterface from '../interfaces/page';

const HomePage: React.FunctionComponent<PageInterface> = (props) => {
	return (
		<Container fluid className="p-0">
			<Navigation />
			<Header title="Course builder" headline="Check out my courses" />
			<Container className="mt-5">Course stuff here</Container>
		</Container>
	);
};

export default HomePage;
