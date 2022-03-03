import React from 'react';
import { Container } from 'reactstrap';

import PageInterface from '../interfaces/page';
import NavBar from '../components/NavBar';

const CoursePage: React.FunctionComponent<PageInterface> = (props) => {
	return (
		<Container fluid className="p-0">
			<NavBar />
			<Container className="mt-5">Courses</Container>
		</Container>
	);
};

export default CoursePage;
