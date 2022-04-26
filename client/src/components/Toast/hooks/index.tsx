import { useEffect, useState } from 'react';

import { uniqueId } from '../helpers';

import styles from './styles.module.scss';

export const useToastPortal = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [portalId] = useState<string>(`toast-portal-${uniqueId()}`);

	useEffect((): ReturnType<any> => {
		const div: HTMLDivElement = document.createElement('div');
		div.className = `${styles.container}`;
		div.id = portalId;
		document.getElementsByTagName('body')[0].prepend(div);
		setLoaded(true);

		return () => document.getElementsByTagName('body')[0].removeChild(div);
	}, [portalId]);

	return { loaded, portalId };
};
