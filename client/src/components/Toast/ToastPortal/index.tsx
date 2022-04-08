import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../hooks';
import Toast from '../Toast';
import { uid } from '../helpers';

import styles from './styles.module.scss';

interface IToast {
	id: string;
	type: string;
	message: string;
}

const ToastPortal = forwardRef(({}, ref) => {
	const [toasts, setToasts] = useState<IToast[]>([]);
	const { loaded, portalId } = useToastPortal();

	const removeToast = (id: string) => {
		setToasts(toasts.filter((toast) => toast.id !== id));
		console.log('Close attempted');
	};

	useImperativeHandle(ref, () => ({
		addMessage(toast: IToast) {
			setToasts([...toasts, { ...toast, id: `${uid()}` }]);
		}
	}));

	return loaded
		? ReactDOM.createPortal(
				<div className={styles.container}>
					{toasts.map((toast) => (
						<Toast
							key={toast.id}
							type={toast.type}
							message={toast.message}
							onClose={() => removeToast(toast.id)}
						/>
					))}
				</div>,
				document.getElementById(portalId)!
		  )
		: null;
});

export default ToastPortal;
