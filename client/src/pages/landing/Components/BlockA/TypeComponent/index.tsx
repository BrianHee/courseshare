import React from 'react';

import styles from './styles.module.scss';

const TypeComponent = () => {
	return (
		<div className={styles['container']}>
			<ul className={styles['dynamic-text']}>
				<li>
					<span>Code</span>
				</li>
				<li>
					<span>Cook</span>
				</li>
				<li>
					<span>Draw</span>
				</li>
			</ul>
		</div>
	);
};

export default TypeComponent;
