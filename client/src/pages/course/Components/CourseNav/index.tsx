import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../../../config/config';
import logging from '../../../../config/logging';
// import ILesson from '../../../interfaces/lesson';

import ICourse from '../../../../interfaces/course';

import check from '../../../../assets/check.png';
import uncheck from '../../../../assets/uncheck.png';
import tabIn from '../../../../assets/tab-in.svg';
import tabOut from '../../../../assets/tab-out.svg';

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
	const [toggled, setToggled] = useState<boolean>(false);
	const { lessons } = props;
	const { courseID, lessonID } = useParams();

	const navigationRef = useRef<HTMLElement>(null);
	const tabRef = useRef<HTMLDivElement>(null);

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

	const handleToggle = () => {
		const navigationElement = navigationRef.current;
		const tabElement = tabRef.current;

		navigationElement?.classList.toggle(styles.toggle);
		tabElement?.classList.toggle(styles.toggle);
		if (tabElement!.classList.contains(styles.toggle)) {
			setToggled(true);
		} else {
			setToggled(false);
		}
	};

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<>
			<nav className={styles['navbar']} ref={navigationRef}>
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
											ele.lessonId === lessonID
												? `${styles.link} ${styles.selected}`
												: styles['link']
										}
										to={`/course/${courseID}/${ele.lessonId}`}
										onClick={handleToggle}
									>
										<div className={styles['lesson-title']}>{ele.lessonTitle}</div>
										<div className={styles['check-wrapper']}>
											{checkCompletion(ele.lessonId) ? (
												<img src={check} />
											) : (
												<img src={uncheck} />
											)}
										</div>
									</Link>
								</li>
							);
						})}
				</ul>
			</nav>
			<div className={styles.tab} ref={tabRef}>
				<button onClick={handleToggle}>{toggled ? <img src={tabIn} /> : <img src={tabOut} />}</button>
			</div>
		</>
	);
};

export default EditNav;
