import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import trashIcon from '../../assets/trash.png';

interface IModalProps {
	type: 'course' | 'lesson';
	onClose: any;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
	const { type, onClose } = props;

	if (type === 'course') {
		return (
			<div className={`${styles.modal} ${styles.success}`}>
				<div className={styles.message}>Are you sure you would like to delete this course?</div>
				<button>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		);
	} else if (type === 'lesson') {
		return (
			<div className={`${styles.modal} ${styles.delete}`} onClick={onClose}>
				<div className={styles.message}>Are you sure you would like to delete this lesson?</div>
				<button>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
