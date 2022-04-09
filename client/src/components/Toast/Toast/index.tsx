import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import checkIcon from '../../../assets/check.png';
import trashIcon from '../../../assets/trash.png';

interface IToastProps {
	type: string;
	message: string;
	onClose: any;
}

const Toast: React.FunctionComponent<IToastProps> = (props) => {
	const { type, message, onClose } = props;

	if (type === 'success') {
		return (
			<div className={`${styles.toast} ${styles.success}`} onClick={onClose}>
				<img src={checkIcon} alt="icon" />
				<div className={styles.message}>{message}</div>
			</div>
		);
	} else if (type === 'delete') {
		return (
			<div className={`${styles.toast} ${styles.delete}`} onClick={onClose}>
				<img src={trashIcon} alt="icon" />
				<div className={styles.message}>{message}</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Toast;
