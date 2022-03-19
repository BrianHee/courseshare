import axios from 'axios';
import React from 'react';
import config from '../../config/config';
import logging from '../../config/logging';

export interface IEditNavProps {
	courseId: string | null;
	lessons: object[];
}

const EditNav: React.FunctionComponent<IEditNavProps> = (props) => {
	const { courseId, lessons } = props;

	const listLessons = async () => {
		try {
			const response = axios.get(`${config.server.url}/course/${courseId}`);
		} catch (error) {
			logging.error(error);
		}
	};

	return <div>Nav for editor</div>;
};

export default EditNav;

// Course -> Map the pages -> Add Page button
