import React from 'react';

import example1 from '../../../../assets/example1.png';
import example2 from '../../../../assets/example2.png';
import example3 from '../../../../assets/example3.png';
import styles from './styles.module.scss';

const BlockB = () => {
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
				<img src={example1} />
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
				<img src={example2} />
			</div>
			<div className={styles.section}>
				<img src={example3} />
				<div className={styles.text}>
					<h1>Learn from others</h1>
					<h2>Try a course curated by us!</h2>
				</div>
			</div>
		</div>
	);
};

export default BlockB;
