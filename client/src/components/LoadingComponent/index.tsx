import React from 'react';

import styles from './styles.module.scss';

export interface ILoadingProps {
	loading: boolean;
}

const LoadingComponent = (props: ILoadingProps) => {
	const { loading } = props;

	if (loading) {
		return <div className={styles['container']}>Loading...</div>;
	} else {
		return null;
	}
};

export default LoadingComponent;
