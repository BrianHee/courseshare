import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../../../config/config';
import logging from '../../../../config/logging';
// import ILesson from '../../../interfaces/lesson';

import ICourse from '../../../../interfaces/course';

import styles from './styles.module.scss';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

export interface IProps {
	lessons: ILessons[];
}

const EditNav: React.FunctionComponent<IProps> = (props) => {
	const [course, setCourse] = useState<ICourse>();
	const { lessons } = props;
	const { courseID, lessonID } = useParams();
	const navigate = useNavigate();

	const getCourse = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setCourse(response.data.course);
			} else {
				logging.error('Unable to get course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<nav className={styles['navbar']}>
			<Link to={`/course/${courseID}`}>
				<p className={styles['title']}>{course && course.title}</p>
			</Link>
			<ul>
				{lessons &&
					lessons.map((ele, idx) => {
						return (
							<li key={idx}>
								<Link
									className={
										ele.lessonId === lessonID ? `${styles.link} ${styles.selected}` : styles['link']
									}
									to={`/course/${courseID}/${ele.lessonId}`}
								>
									{ele.lessonTitle}
								</Link>
							</li>
						);
					})}
			</ul>
		</nav>
	);
};

export default EditNav;
