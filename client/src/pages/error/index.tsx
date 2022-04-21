import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const ErrorPage: React.FunctionComponent = () => {
	return (
		<div>
			<p>Error</p>
			<Link to="/home">Return Home</Link>
		</div>
	);
};

export default ErrorPage;
