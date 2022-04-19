import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import blockA from '../../../../assets/blockA.png';

const BlockA = () => {
	const animation = useRef(null);

	return (
		<div className={styles.container}>
			<div className={styles['component-container']}>
				<div className={styles['left-component']}>
					<h1 className={styles['dynamic']}>Learn.</h1>
					<h1 className={styles['dynamic']}>Teach.</h1>
					<h1 className={styles['dynamic']}>Share.</h1>
				</div>
				<div className={styles['right-component']} ref={animation}>
					<img src={blockA} />
				</div>
			</div>
		</div>
	);
};

export default BlockA;
