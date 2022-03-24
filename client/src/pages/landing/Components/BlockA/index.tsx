import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import steak from '../../../../assets/steak.png';
import code from '../../../../assets/code.png';
import blocka from '../../../../assets/blocka.png';

const BlockA = () => {
	const [currentImage, setCurrentImage] = useState(steak);

	// const transitionImage = () => {
	// 	if (currentImage === steak) {
	// 		setCurrentImage(code);
	// 	} else {
	// 		setCurrentImage(steak);
	// 	}
	// };

	// useEffect(() => {
	// 	setInterval(transitionImage, 1000);
	// }, [currentImage]);

	return (
		<div className={styles.container}>
			<div className={styles['component-container']}>
				<div className={styles['left-component']}>
					<h1>Learn.</h1>
					<h1>Teach.</h1>
					<h1>Share.</h1>
				</div>
				<div className={styles['right-component']}>
					<img src={blocka} alt="steak" height="650" />
					<img className={styles['image-component']} id="image" src={currentImage} alt="steak" height="100" />
					{/* <img src={code} alt="steak" height="200" /> */}
				</div>
			</div>
		</div>
	);
};

export default BlockA;
