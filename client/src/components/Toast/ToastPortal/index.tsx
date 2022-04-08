import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../hooks';

import styles from './styles.module.scss';

const ToastPortal: React.FunctionComponent = () => {
	const { loaded, portalId } = useToastPortal();

	return loaded
		? ReactDOM.createPortal(<div className={styles.container}>Toast</div>, document.getElementById(portalId)!)
		: null;
};

export default ToastPortal;
