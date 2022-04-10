import React, { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

import config from '../../config/config';
import logging from '../../config/logging';

import styles from './styles.module.scss';
import trashIcon from '../../assets/trash.png';

interface IModalProps {
	type: 'course' | 'lesson';
	onConfirm: any;
	onClose: any;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
	const { type, onConfirm, onClose } = props;
	const { courseID, lessonID } = useParams();

	// const confirmFunction = useMemo(() => {
	// 	onConfirm();
	// 	onClose();
	// }, [onConfirm]);

	function confirmFunction() {
		onConfirm();
		onClose();
	}

	if (type === 'course') {
		return (
			<div className={`${styles.modal} ${styles.success}`}>
				<div className={styles.message}>Are you sure you would like to delete this course?</div>
				<button onClick={confirmFunction}>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		);
	} else if (type === 'lesson') {
		return (
			<div className={`${styles.modal} ${styles.delete}`}>
				<div className={styles.message}>Are you sure you would like to delete this lesson?</div>
				<button onClick={confirmFunction}>Confirm</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
