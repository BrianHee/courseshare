import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const ErrorPage: React.FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Whoops!</h1>
				<h2>Looks like you are in uncharted territory ☠️...</h2>
				<Link className={styles.link} to="/home">
					Return Home
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
