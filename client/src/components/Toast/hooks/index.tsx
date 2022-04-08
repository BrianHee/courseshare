import React, { useEffect, useState } from 'react';

import { uid } from '../helpers';

import styles from './styles.module.scss';

export const useToastPortal = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [portalId] = useState<string>(`toast-portal-${uid()}`);

	useEffect((): ReturnType<any> => {
		const div: HTMLDivElement = document.createElement('div');
		div.className = `${styles.container}`;
		div.id = portalId;
		document.getElementsByTagName('body')[0].prepend(div);
		setLoaded(true);

		return () => document.getElementsByClassName('body')[0].removeChild(div);
	}, [portalId]);

	return { loaded, portalId };
};
