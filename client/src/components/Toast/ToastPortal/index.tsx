import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../hooks';
import Toast from '../Toast';
import { uniqueId } from '../helpers';

import styles from './styles.module.scss';

interface IToast {
	id: string;
	type: string;
	message: string;
}

const ToastPortal = forwardRef(({}, ref) => {
	const [toasts, setToasts] = useState<IToast[]>([]);
	const [removing, setRemoving] = useState<string>('');

	const { loaded, portalId } = useToastPortal();

	const removeToast = (id: string) => {
		setToasts(toasts.filter((toast) => toast.id !== id));
	};

	useEffect(() => {
		if (toasts.length) {
			const id = toasts[toasts.length - 1].id;

			setTimeout(() => {
				setRemoving(id);
			}, 3000);
		}
	}, [toasts]);

	useEffect(() => {
		if (removing) {
			setToasts(toasts.filter((toast) => toast.id !== removing));
		}
	}, [removing]);

	useImperativeHandle(ref, () => ({
		addMessage(toast: IToast) {
			setToasts([...toasts, { ...toast, id: `${uniqueId()}` }]);
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
