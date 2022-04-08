import React, { useState } from 'react';

import styles from './styles.module.scss';

const Toast: React.FunctionComponent = () => {
	const [text, setText] = useState<string>('');
	const [mode, setMode] = useState<string>('info');

	return <>Toast Notification</>;
};

export default Toast;
