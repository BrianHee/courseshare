import React from 'react';

import styles from './styles.module.scss';

export interface IModalProps {
	show: boolean;
	text: string;
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
	const { show, text } = props;

	if (show) {
		return (
			<div className={styles.container}>
				<div className={styles.modal}></div>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
