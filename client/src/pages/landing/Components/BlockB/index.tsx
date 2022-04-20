import React, { useEffect, useState } from 'react';

import example1 from '../../../../assets/example1.png';
import example2 from '../../../../assets/example2.png';
import example3 from '../../../../assets/example3.png';
import styles from './styles.module.scss';

const BlockB = () => {
	const [scrollA, setScrollA] = useState<boolean>(false);
	const [scrollB, setScrollB] = useState<boolean>(false);
	const [scrollC, setScrollC] = useState<boolean>(false);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(styles.animation);
					return;
				}
			});
		},
		{ rootMargin: '-40% 0% -40% 0%' }
	);

	useEffect(() => {
		observer.observe(document.getElementById('imageA')!);
		observer.observe(document.getElementById('imageB')!);
		observer.observe(document.getElementById('imageC')!);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles['header-text']}>
					<h1>An intuitive course building platform for the internet</h1>
					<h2>
						Be it a recipe, a tutorial, or an online class, effectively convey your expertise to any
						audience.
					</h2>
				</div>
			</div>
			<div className={styles.section}>
				<img src={example1} id="imageA" />
				<div className={styles.text}>
					<h1>Build your course</h1>
					<h2>
						Quickly customize your personal curriculum using an user-friendly interface with fast and easy
						tools.
					</h2>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.text}>
					<h1>Express your passions</h1>
					<h2>Share your interests in a learning-conducive format for your targeted audience.</h2>
				</div>
				<img src={example2} id="imageB" />
			</div>
			<div className={styles.section}>
				<img src={example3} id="imageC" />
				<div className={styles.text}>
					<h1>Learn from others</h1>
					<h2>Try a course curated by us!</h2>
				</div>
			</div>
		</div>
	);
};

export default BlockB;
