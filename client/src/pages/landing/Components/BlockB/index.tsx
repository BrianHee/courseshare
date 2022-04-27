import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import example1 from '../../../../assets/example1.png';
import example2 from '../../../../assets/example2.png';
import nystrip from '../../../../assets/nystrip.png';
import toast from '../../../../assets/toast.png';
import config from '../../../../config/config';
import styles from './styles.module.scss';

const BlockB = () => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(styles.animation);
					observer.unobserve(entry.target);
					return;
				}
			});
		},
		{ rootMargin: '-40% 0% -40% 0%' }
	);

	useEffect(() => {
		const elementIds = ['imageA', 'imageB', 'imageC', 'imageD', 'imageE'];

		elementIds.map((id) => observer.observe(document.getElementById(id)!));
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
			<div className={`${styles.section} ${styles.sectionB}`}>
				<div className={styles.text}>
					<h1>Express your passions</h1>
					<h2>Share your interests in a learning-conducive format for your targeted audience.</h2>
				</div>
				<img src={example2} id="imageB" />
			</div>
			<div className={styles.section}>
				<div className={styles['links-container']}>
					<div className={styles['course-links']} id="imageC">
						<Link className={styles.link} to={`/course/6252ff5c17a0cd3bf521529c`}>
							<img src={nystrip} id="imageD" />
						</Link>
						<Link className={styles.link} to={`/course/6267341e7a4e402cdc5d65f2`}>
							<img className={styles.scale} src={toast} id="imageE" />
						</Link>
					</div>
				</div>
				<div className={styles.text}>
					<h1>Learn from others</h1>
					<h2>Try a course curated by us!</h2>
				</div>
			</div>
		</div>
	);
};

export default BlockB;
