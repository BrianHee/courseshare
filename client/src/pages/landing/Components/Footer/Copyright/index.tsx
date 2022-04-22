import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const Copyright = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div>
				<h1>© 2022 Courseshare All Rights Reserved.</h1>
			</div>
			<div className={styles.links}>
				<Link to="/">Privacy</Link> <Link to="/">Terms</Link>
				<Link to="/">Contact</Link>
			</div>
		</div>
	);
};

export default Copyright;
