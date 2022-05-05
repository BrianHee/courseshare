import React from 'react';

import styles from './styles.module.scss';
import trashIcon from '../../assets/trash.png';

interface IModalProps {
	type: 'course' | 'lesson';
	onConfirm: () => void;
	onClose: () => void;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
	const { type, onConfirm, onClose } = props;

	function confirmFunction() {
		onConfirm();
		onClose();
	}

	if (type === 'course') {
		return (
			<div className={styles.container}>
				<div className={styles.modal}>
					<img src={trashIcon} alt="icon" />
					<div className={styles.message}>Are you sure you would like to delete this course?</div>
					<div className={styles.buttons}>
						<button className={styles.confirm} onClick={confirmFunction}>
							Confirm
						</button>
						<button className={styles.cancel} onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	} else if (type === 'lesson') {
		return (
			<div className={styles.container}>
				<div className={styles.modal}>
					<img src={trashIcon} alt="icon" />
					<div className={styles.message}>Are you sure you would like to delete this lesson?</div>
					<div className={styles.buttons}>
						<button className={styles.confirm} onClick={confirmFunction}>
							Confirm
						</button>
						<button className={styles.cancel} onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
