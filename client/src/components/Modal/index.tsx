import React from 'react';
import { useParams } from 'react-router-dom';

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
