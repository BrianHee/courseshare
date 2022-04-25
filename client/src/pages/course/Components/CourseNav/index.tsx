import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../../../config/config';
import logging from '../../../../config/logging';
// import ILesson from '../../../interfaces/lesson';

import ICourse from '../../../../interfaces/course';

import check from '../../../../assets/check.png';
import uncheck from '../../../../assets/uncheck.png';
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
	const [completed, setCompleted] = useState<boolean>(false);
	const { lessons } = props;
	const { courseID, lessonID } = useParams();

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

	const checkCompletion = (lessonId: string) => {
		return localStorage.getItem(lessonId);
	};

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<nav className={styles['navbar']}>
			<div className={styles['course-header']}>
				<Link to={`/course/${courseID}`}>
					<p className={lessonID ? styles['title'] : `${styles.title} ${styles.selected}`}>
						{course && course.title}
					</p>
				</Link>
			</div>
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
									<div className={styles['lesson-title']}>{ele.lessonTitle}</div>
									<div className={styles['check-wrapper']}>
										{checkCompletion(ele.lessonId) ? <img src={check} /> : <img src={uncheck} />}
									</div>
								</Link>
							</li>
						);
					})}
			</ul>
		</nav>
	);
};

export default EditNav;
