import React, { useMemo } from 'react';

import styles from './styles.module.scss';

interface IToastProps {
	type: string;
	message: string;
	onClose: any;
}

const Toast: React.FunctionComponent<IToastProps> = (props) => {
	const { type, message, onClose } = props;

	const stylesClasses = useMemo(() => [styles.toast, styles[type]].join(' '), [type]);

	return (
		<div className={stylesClasses} onClick={onClose}>
			<div className={styles.message}>{message}</div>
		</div>
	);
};

export default Toast;
