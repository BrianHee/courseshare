import React from 'react';

import { RotatingLines } from 'react-loader-spinner';

import styles from './styles.module.scss';

const LoadingComponent = () => {
	return (
		<div className={styles['container']}>
			<div>
				<RotatingLines width="50" strokeColor="#83c3ff" />
			</div>
			<br />
			<h1>Loading...</h1>
		</div>
	);
};

export default LoadingComponent;
