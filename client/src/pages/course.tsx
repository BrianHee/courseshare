import React, { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';

import PageInterface from '../interfaces/page';
import NavBar from '../components/NavBar';
import { UserContext } from '../context';

const CoursePage: React.FunctionComponent<PageInterface> = (props) => {
	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	useEffect(() => {
		console.log(state, 'from CoursePage');
	}, []);

	return (
		<Container fluid className="p-0">
			<NavBar />
			{state.data ? <h1>Hello, {state.data.firstName}</h1> : <></>}
			<Container className="mt-5">Courses</Container>
		</Container>
	);
};

export default CoursePage;
