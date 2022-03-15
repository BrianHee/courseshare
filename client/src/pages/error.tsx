import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FunctionComponent = () => {
	return (
		<div>
			<p>Error</p>
			<Link to="/">Return Home</Link>
		</div>
	);
};

export default ErrorPage;
