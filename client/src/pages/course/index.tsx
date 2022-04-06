import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../config/config';
import logging from '../../config/logging';
import ICourse from '../../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NavBar from '../../components/NavBar';

import styles from './styles.module.scss';
import CourseNav from './Components/CourseNav';
import ILesson from '../../interfaces/lesson';
import LoadingComponent from '../../components/LoadingComponent';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

const CoursePage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [course, setCourse] = useState<ICourse | null>(null);
	const [navLessons, setNavLessons] = useState<ILessons[]>([]);
	const [lesson, setLesson] = useState<ILesson | null>();
	const [loading, setLoading] = useState<boolean>(true);

	const { courseID, lessonID } = useParams();
	const navigate = useNavigate();

	const getCourse = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setCourse(response.data.course);
			} else {
				logging.error('Unable to set course');
				navigate('/error');
			}
		} catch (error) {
			console.log('catch entered');
			logging.error(error);
			navigate('/error');
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	const getNavLessons = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setNavLessons(response.data.course.lessons);
			} else {
				logging.error('Unable to find course');
				navigate('/error');
			}
		} catch (error) {
			logging.error(error);
			navigate('/error');
		}
	};

	const getLesson = async () => {
		if (lessonID) {
			try {
				const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);

				if (response.status === 200) {
					setLesson(response.data.lesson);
				} else {
					logging.error('Unable to find lesson');
					navigate('/error');
				}
			} catch (error) {
				logging.error(error);
				navigate('/error');
			}
		}
	};

	useEffect(() => {
		getNavLessons();
		getCourse();
	}, []);

	useEffect(() => {
		getLesson();
		if (!lessonID) {
			setLesson(null);
		}
	}, [lessonID]);

	if (course) {
		return (
			<div>
				<NavBar />
				{loading ? (
					<LoadingComponent />
				) : (
					<div>
						<CourseNav lessons={navLessons} />
						<div className={styles['container']}>
							{lesson ? (
								<div className={styles['wrapper']}>
									<div className={styles['lesson-title']}>{lesson.title}</div>
									<div
										className={styles['html-content']}
										dangerouslySetInnerHTML={{ __html: lesson.content }}
									/>
								</div>
							) : (
								<div className={styles['wrapper']}>
									<div className={styles['course-title']}>{course.title}</div>
									<div
										className={styles['html-content']}
										dangerouslySetInnerHTML={{ __html: course.description }}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	} else {
		return <Link to="/home" />;
	}
};

export default CoursePage;
