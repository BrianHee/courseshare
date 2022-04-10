import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { useModalPortal } from '../hooks';
import { uid } from '../../Toast/helpers';

import styles from './styles.module.scss';
import Modal from '..';

interface IModal {
	id: string;
	type: 'course' | 'lesson';
	onConfirm: any;
}

const ModalPortal = forwardRef(({}, ref) => {
	const [modal, setModal] = useState<IModal | null>();

	const { loaded, portalId } = useModalPortal();

	const removeModal = () => {
		setModal(null);
	};

	useImperativeHandle(ref, () => ({
		addModal(modal: IModal) {
			setModal({ ...modal, id: `${uid()}` });
		}
	}));

	return loaded
		? ReactDOM.createPortal(
				<div className={styles.container}>
					{modal ? (
						<Modal
							key={modal.id}
							type={modal.type}
							onConfirm={modal.onConfirm}
							onClose={() => removeModal()}
						/>
					) : null}
				</div>,
				document.getElementById(portalId)!
		  )
		: null;
});

export default ModalPortal;
