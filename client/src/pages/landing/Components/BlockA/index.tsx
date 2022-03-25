import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-web';

import styles from './styles.module.scss';
import steak from '../../../../assets/steak.png';
import code from '../../../../assets/code.png';
import blocka from '../../../../assets/blocka.png';
import TypeComponent from './TypeComponent';

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

	const animation = useRef(null);

	useEffect(() => {
		Lottie.loadAnimation({
			container: animation.current!,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: require('../../../../assets/course.json')
		});
	}, [animation]);

	return (
		<div className={styles.container}>
			<div className={styles['component-container']}>
				<div className={styles['left-component']}>
					<h1>Learn.</h1>
					<h1>Teach.</h1>
					<h1>Share.</h1>
				</div>
				<div className={styles['right-component']} ref={animation}>
					{/* <img src={blocka} alt="steak" height="650" />
					<img className={styles['image-component']} id="image" src={currentImage} alt="steak" height="100" />
					<TypeComponent /> */}
				</div>
			</div>
		</div>
	);
};

export default BlockA;
