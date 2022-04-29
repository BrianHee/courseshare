import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import share from '../../../../assets/share.png';

import styles from './styles.module.scss';

const ShareButton: React.FunctionComponent = () => {
	const { courseID } = useParams();
	const buttonElementRef = useRef<HTMLButtonElement>(null);
	const notifElementRef = useRef<HTMLDivElement>(null);

	const courseLink = useMemo(() => `${process.env.REACT_APP_SERVER_URL}/course/${courseID}`, [courseID]);

	const handleClick = () => {
		navigator.clipboard.writeText(courseLink);

		const buttonElement = buttonElementRef.current;
		const notifElement = notifElementRef.current;
		buttonElement!.classList.add(styles.animate);
		notifElement!.classList.add(styles.animate);

		setTimeout(() => {
			buttonElement!.classList.remove(styles.animate);
			notifElement!.classList.remove(styles.animate);
		}, 2000);
	};

	return (
		<div className={styles.container}>
			<button onClick={handleClick} className={styles.share} ref={buttonElementRef}>
				<img src={share} alt="share" />
			</button>
			<div className={styles.notification} ref={notifElementRef}>
				Link copied to clipboard!
			</div>
		</div>
	);
};

export default ShareButton;
